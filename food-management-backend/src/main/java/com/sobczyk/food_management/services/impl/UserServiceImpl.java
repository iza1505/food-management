package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import com.sobczyk.food_management.exceptions.ConfirmedAccountException;
import com.sobczyk.food_management.exceptions.EmptyFieldException;
import com.sobczyk.food_management.exceptions.EntityAlreadyExistsException;
import com.sobczyk.food_management.exceptions.IncompatibilityDataException;
import com.sobczyk.food_management.exceptions.FMEntityNotFoundException;
import com.sobczyk.food_management.repositories.UserRepository;
import com.sobczyk.food_management.security.*;
import com.sobczyk.food_management.services.interfaces.RoleService;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final JsonWebTokenProvider tokenProvider;
    private UserSessionService userSessionService;
    private RoleService roleService;
    private AuthenticationManager authenticationManager;
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;
    private EmailProvider emailProvider;
    private ModelMapper modelMapper;
    private HeadersPaginationImpl headersPagination;
    private LoginValidator loginValidator;
    private PasswordValidator passwordValidator;

    @Autowired
    public UserServiceImpl(
            @Lazy UserSessionService userSessionService,
            UserRepository repository,
            RoleService roleService,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JsonWebTokenProvider tokenProvider,
            EmailProvider emailProvider, ModelMapper modelMapper, HeadersPaginationImpl headersPagination,
            LoginValidator loginValidator,
            PasswordValidator passwordValidator) {
        this.userSessionService = userSessionService;
        this.authenticationManager = authenticationManager;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.tokenProvider = tokenProvider;
        this.emailProvider = emailProvider;
        this.modelMapper = modelMapper;
        this.headersPagination = headersPagination;
        this.loginValidator = loginValidator;
        this.passwordValidator = passwordValidator;
    }

    @Override
    public UserDto convertToDto(UserEntity entity) {
        return modelMapper.map(entity, UserDto.class);
    }

    @Override
    public UserEntity convertToEntity(UserDto dto) {
        return modelMapper.map(dto, UserEntity.class);
    }

    @Override
    public void add(RegistrationDto registrationDto) {
        if (registrationDto.getLogin() == null) {
            throw new EmptyFieldException("Login cannot be null", "exception.emptyLogin");
        }

        if (repository.existsByLogin(registrationDto.getLogin())) {
            throw new EntityAlreadyExistsException(
                    "User with login " + registrationDto.getLogin() + " already exists.", "exception.userWithLoginExists");
        } else {
            loginValidator.checkBasicConditions(registrationDto.getLogin());
        }

        if (registrationDto.getEmail() == null) {
            throw new EmptyFieldException("Email cannot be null", "exception.emptyEmail");
        }
        if (repository.existsByEmail(registrationDto.getEmail())) {
            throw new EntityAlreadyExistsException(
                    "User with email " + registrationDto.getEmail() + " already exists.", "exception.userWithEmailExists");
        }

        if (registrationDto.getPassword() == null) {
            throw new EmptyFieldException("Password cannot be null", "exception.emptyPassword");
        } else {
            passwordValidator.checkBasicConditions(registrationDto.getPassword());
        }

        String hashedPassword = passwordEncoder.encode("manager");//registrationDto.getPassword()
        UserDto userDto =
                new UserDto(null, 0L, registrationDto.getLogin(), registrationDto.getEmail(), hashedPassword, null,
                            false
                );

        UserEntity userEntity = convertToEntity(userDto);

        if (registrationDto.getRole() == null) {
            userEntity.setRole(roleService.findByName("USER"));
        } else {
        userEntity.setRole(roleService.findByName(registrationDto.getRole()));
        }

        if(registrationDto.getCreatorLogin() != null){
            userEntity.setCreatorLogin(registrationDto.getCreatorLogin());
        }

        repository.save(userEntity);

        sendActivationEmail(hashedPassword, registrationDto.getEmail(),registrationDto.getLanguage());
    }

    @Override
    public void sendActivationEmail(String hashedPassword, String email, String language) {
        SimpleMailMessage emailToSend;
        if(language.equals("pl")){
            if(hashedPassword == null){
                emailProvider.sendEmail("", email, "", "Aktywacja konta - informacja",
                                   "Nie możesz aktywować konta ponieważ jest ono dezaktywowane " +
                                                             "przez administratora."
                                  );
            } else {
                String hashPasswordHash = passwordEncoder.encode(hashedPassword);
                String jwt = tokenProvider.generateActivationToken(email, hashPasswordHash);
                emailProvider.sendEmail(jwt, email, "/auth/registration?token=", "Aktywacja konta",
                                   "Aktywuj swoje konto używając linku:"
                                  );
            }
        }
        else {
            if(hashedPassword == null){
                emailProvider.sendEmail("", email, "", "Account activation information",
                                   "You can't active account because it is deactivated by administrator. "
                                  );
            } else {
                String hashPasswordHash = passwordEncoder.encode(hashedPassword);
                String jwt = tokenProvider.generateActivationToken(email, hashPasswordHash);
                emailProvider.sendEmail(jwt, email, "/auth/registration?token=", "Account activation",
                                   "Active your account using link:"
                                  );
            }
        }

    }

    @Override
    public void confirmAccount(String token) {
        String email = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(email);
        if (userEntity != null) {
            if (userEntity.getConfrimationDate() != null) {
                throw new ConfirmedAccountException("Account with id " + userEntity.getId() + " is confirmed",
                                                    "exception.accountAlreadyConfirmed");
            }
            if (passwordEncoder
                    .matches(userEntity.getPasswordHash(), tokenProvider.getHashPasswordHashFromJWT(token))) {
                if (userEntity.getActive().equals(false)) {
                    userEntity.setActive(true);
                    userEntity.setConfrimationDate(new Date(System.currentTimeMillis()));
                    repository.save(userEntity);
                } else {
                    throw new ConfirmedAccountException("Account with id " + userEntity.getId() + " is activated.",
                                                        "exception.accountAlreadyActive");
                }
            } else {
                throw new ConfirmedAccountException("Registration password is different with current password for " +
                                                            "account with id " + userEntity.getId(), "exception.differentPasswords");
            }
        } else {
            throw new FMEntityNotFoundException("User with email " + email + " not exists.","exception.userNotExists");
        }
    }

    @Override
    public UserDetailsToChangeDto updateDetails(UserDetailsToChangeDto dto) {
        UserEntity userToUpdate = userSessionService.getUser();
        Validator.validateVersion(userToUpdate, dto.getVersion());

        userToUpdate.setEmail(dto.getEmail());
        userToUpdate = repository.saveAndFlush(userToUpdate);

        return new UserDetailsToChangeDto(userToUpdate.getEmail(), userToUpdate.getVersion());
    }

    @Override
    public HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
        List<UserEntity> userEntities = repository.findAll();
        List<UsersDetailsDto> dtos = new ArrayList<>();
        for (UserEntity userEntity : userEntities) {
            dtos.add(new UsersDetailsDto(userEntity.getId(), userEntity.getVersion(), userEntity.getLogin(),
                                         userEntity.getEmail(), userEntity.getRole().getName(),
                                         userEntity.getActive()));
        }
        return headersPagination.createHeaderDto(elementsOnPage, currentPage, dtos, sortBy, ascendingSort);
    }

    @Override
    public UserEntity findByLogin(String login) {
        return repository.findByLogin(login)
                .orElseThrow(() -> new FMEntityNotFoundException("User with login " + login + " not found.",
                                                                 "exception.userNotExists"));
    }

    @Override
    public UserEntity findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new FMEntityNotFoundException("User with email " + email + " not found.","exception.userNotExists"));
    }

    @Override
    public UserEntity findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new FMEntityNotFoundException("User with id " + id + " not " +
                                                                                               "found.","exception.userNotExists"));
    }

    @Override
    public Authentication authenticate(String login, String password) {
        try {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        }catch (BadCredentialsException e){
            throw new IncompatibilityDataException("Invalid credentials","exception.invalidCredentials");
        }

    }

    @Override
    public Integer getIngredientPercentage(Long id, List<UserIngredientEntity> userIngredients) {
        for (UserIngredientEntity ingredient : userIngredients) {
            if (ingredient.getUserIngredientKey().getIngredient().getId().equals(id)) {
                return ingredient.getAmount().intValue();
            }
        }
        return 0;

    }

    @Override
    public void forgotPassword(ForgotPasswordOrResendConfirmationEmailDto dto) {
        UserEntity userEntity = findByEmail(dto.getEmail());
        if(userEntity.getLogin().equals(dto.getLogin())){
            if(userEntity.getConfrimationDate()==null){
                throw new IncompatibilityDataException("Can't reset password of not confirmed account. Id account: " + userEntity.getId(),
                                                       "exception.firstConfirmAccount");
            }
            String passwordHash = passwordEncoder.encode(findByEmail(userEntity.getEmail()).getPasswordHash());
            String jwt = tokenProvider.generatePasswordToken(userEntity.getEmail(), passwordHash);
            SimpleMailMessage emailToSend;
            if(dto.getLanguage().equals("pl")){
                 emailProvider.sendEmail(jwt, userEntity.getEmail(), "/auth/forgotPassword?token=",
                                   "Resetuj hasło",
                                   "Resetuj swoje hasło używając linku:"
                                  );
            } else {
                 emailProvider.sendEmail(jwt, userEntity.getEmail(), "/auth/forgotPassword?token=",
                                   "Reset password",
                                   "Reset your password using link:"
                                  );
            }

        } else {
            throw new IncompatibilityDataException("User with this login "+dto.getLogin()+" and email "+dto.getEmail()+" not " +
                    "exists.",
                                                   "exception.userNotExists");
        }

    }

    @Override
    public void resetForgottenPassword(String newPassword, String token) {
        tokenProvider.validatePasswordToken(token);
        String userEmail = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(userEmail);
        if (passwordEncoder
                .matches(userEntity.getPasswordHash(), tokenProvider.getHashPasswordHashFromJWT(token))) {
            passwordValidator.checkBasicConditions(newPassword);
            userEntity.setPasswordHash(passwordEncoder.encode(newPassword));
        } else {
            throw new IncompatibilityDataException("The password cannot be reset again using the same token.",
                                                   "exception.passwordResetAgain");
        }

    }

    @Override
    public void changePassword(ChangePasswordDto dto) {
        UserEntity userEntity = userSessionService.getUser();
        
        if (passwordEncoder.matches(dto.getOldPassword(), userEntity.getPasswordHash())) {
            passwordValidator.checkBasicConditions(dto.getNewPassword());
            String newPasswordHash = passwordEncoder.encode(dto.getNewPassword());
            userEntity.setPasswordHash(newPasswordHash);
            repository.save(userEntity);
        } else {
            throw new IncompatibilityDataException("Old password is incorrect. User id: " + userEntity.getId(),
                                                   "exception.incorrectOldPassword");
        }
    }

    @Override
    public MyDetailsUserDto getMyDetails() {
        UserEntity userEntity = userSessionService.getUser();
        return new MyDetailsUserDto(userEntity.getId(), userEntity.getVersion(), userEntity.getLogin(),
                                    userEntity.getEmail());
    }

    @Override
    public ChangeActiveStatusDto updateActiveStatus(ChangeActiveStatusDto dto) {
        UserEntity userEntitySession = userSessionService.getUser();
        if (userEntitySession.getId().equals(dto.getId())) {
            throw new IncompatibilityDataException("Can't change status own account. User id " + userEntitySession.getId(),
                                                   "exception.changeStatusOwnAccoutn");
        }
        UserEntity userEntity = findById(dto.getId());
        Validator.validateVersion(userEntity, dto.getVersion());

        userEntity.setActive(dto.getActive());
        userEntity = repository.saveAndFlush(userEntity);
        dto.setActive(userEntity.getActive());
        return dto;
    }

    @Override
    public JsonWebTokenAuthenticationResponse loginUser(LoginRequest loginRequest) {
        Authentication authenticationToSystem = authenticate(loginRequest.getLogin(), loginRequest.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authenticationToSystem);
        String loginJWT = tokenProvider.generateToken(authenticationToSystem);
        JsonWebTokenAuthenticationResponse loginResponse = new JsonWebTokenAuthenticationResponse();
        loginResponse.setAccessToken(loginJWT);
        return  loginResponse;
    }

    @Override
    public void resendConfirmationEmail(ForgotPasswordOrResendConfirmationEmailDto dto) {
        UserEntity userEntity = findByEmail(dto.getEmail());
        if(userEntity.getLogin().equals(dto.getLogin())){
            if(!userEntity.getActive() && userEntity.getConfrimationDate() == null){
                sendActivationEmail(userEntity.getPasswordHash(), userEntity.getEmail(), dto.getLanguage());
            } else {
                if(!userEntity.getActive() && userEntity.getConfrimationDate() != null)
                sendActivationEmail(null, userEntity.getEmail(), dto.getLanguage());
            }
            if(userEntity.getActive()){
                throw  new IncompatibilityDataException("Account with id " + userEntity.getId()+" is active.","Twoje " +
                        "konto jest aktywne.");
            }
        } else {
            throw new IncompatibilityDataException("User with this login "+ userEntity.getLogin() +" and email "+userEntity.getEmail()+
                                                           " not " +
                                                           "exists.","exception.userNotExists");
        }


    }

}
