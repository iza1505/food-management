package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import com.sobczyk.food_management.exceptions.ConfirmedAccountException;
import com.sobczyk.food_management.exceptions.EmptyFieldException;
import com.sobczyk.food_management.exceptions.EntityAlreadyExistsException;
import com.sobczyk.food_management.exceptions.IncompatibilityDataException;
import com.sobczyk.food_management.exceptions.configuration.FMEntityNotFoundException;
import com.sobczyk.food_management.repositories.UserRepository;
import com.sobczyk.food_management.security.*;
import com.sobczyk.food_management.services.interfaces.RoleService;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final JwtTokenProvider tokenProvider;
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
            JwtTokenProvider tokenProvider,
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
            throw new EmptyFieldException("Login cannot be null", "Login nie może być pusty.");
        }

        if (repository.existsByLogin(registrationDto.getLogin())) {
            throw new EntityAlreadyExistsException(
                    "User with login " + registrationDto.getLogin() + " already exists.", "Użytkownik z podanym " +
                    "loginem już istnieje");
        } else {
            loginValidator.checkBasicConditions(registrationDto.getLogin());
        }

        if (registrationDto.getEmail() == null) {
            throw new EmptyFieldException("Email cannot be null", "Email nie może być pusty.");
        }
        if (repository.existsByEmail(registrationDto.getEmail())) {
            throw new EntityAlreadyExistsException(
                    "User with email " + registrationDto.getEmail() + " already exists.", "Użytkownik z podanym " +
                    "mailem już istnieje.");
        }

        if (registrationDto.getPassword() == null) {
            throw new EmptyFieldException("Password cannot be null", "Hasło nie może być puste.");
        } else {
            passwordValidator.checkBasicConditions(registrationDto.getPassword());
        }

        String hashedPassword = passwordEncoder.encode(registrationDto.getPassword());
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

        repository.save(userEntity);

        sendActivationEmail(hashedPassword, registrationDto.getEmail());
    }

    @Override
    public void sendActivationEmail(String hashedPassword, String email) {
        SimpleMailMessage emailToSend;
        if(hashedPassword == null){
            emailToSend = emailProvider
                    .constructResetPasswordEmail("", email, "", "Account activation information",
                                                 "You can't active account because it is deactivated by administrator. "
                                                );
        } else {
            String hashPasswordHash = passwordEncoder.encode(hashedPassword);
            String jwt = tokenProvider.generatePasswordToken(email, hashPasswordHash);
            emailToSend = emailProvider
                    .constructResetPasswordEmail(jwt, email, "/auth/registration?token=", "Account activation",
                                                 "Active your account using link"
                                                );
        }

        emailProvider.sendEmail(emailToSend);
    }

    @Override
    public void confirmAccount(String token) {
        String email = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(email);
        if (userEntity != null) {
            if (userEntity.getConfrimationDate() != null) {
                throw new ConfirmedAccountException("Account with id " + userEntity.getId() + " is confirmed",
                                                    "Konto jest już zatwierdzone.");
            }
            if (passwordEncoder
                    .matches(userEntity.getPasswordHash(), tokenProvider.getHashPasswordHashFromJWT(token))) {
                if (userEntity.getActive().equals(false)) {
                    userEntity.setActive(true);
                    userEntity.setConfrimationDate(new Date(System.currentTimeMillis()));
                    repository.save(userEntity);
                } else {
                    throw new ConfirmedAccountException("Account with id " + userEntity.getId() + " is activated.",
                                                        "Konto jest już aktywne.");
                }
            } else {
                throw new ConfirmedAccountException("Registration password is different with current password for " +
                                                            "account with id " + userEntity.getId(), "Hasło podane " +
                        "podczas rejestracji i obecne różnią się.");
            }
        } else {
            throw new FMEntityNotFoundException("User with email " + email + " not exists.","Użytkownik nie istnieje.");
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
                .orElseThrow(() -> new FMEntityNotFoundException("User with login " + login + " not found.","U" +
                        "żytkownik nie jestnieje."));
    }

    @Override
    public UserEntity findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new FMEntityNotFoundException("User with email " + email + " not found.","U" +
                        "żytkownik nie istnieje."));
    }

    @Override
    public UserEntity findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new FMEntityNotFoundException("User with id " + id + " not found.","Użytkownik nie istnieje."));
    }

    @Override
    public Authentication authenticate(String login, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
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
        if(userEntity.getConfrimationDate()==null){
            throw new IncompatibilityDataException("Can't reset password of not confirmed account. Id account: " + userEntity.getId(),
                                                   "Aby " +
                    "zresetować hasło potwierdź utworzone konto.");
        }
        if(userEntity.getLogin().equals(dto.getLogin())){
            String passwordHash = passwordEncoder.encode(findByEmail(userEntity.getEmail()).getPasswordHash());
            String jwt = tokenProvider.generatePasswordToken(userEntity.getEmail(), passwordHash);
            SimpleMailMessage emailToSend = emailProvider
                    .constructResetPasswordEmail(jwt, userEntity.getEmail(), "/auth/forgotPassword?token=", "Reset Password",
                                                 "Reset your password using link:"
                                                );
            emailProvider.sendEmail(emailToSend);
        } else {
            throw new IncompatibilityDataException("User with this login "+dto.getLogin()+" and email "+dto.getEmail()+" not " +
                    "exists.",
                                                   "Brak konta " +
                    "dla " +
                    "podanego loginu i hasła");
        }

    }

    @Override
    public void resetForgottenPassword(String newPassword, String token) {
        String userEmail = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(userEmail);
        if (passwordEncoder
                .matches(userEntity.getPasswordHash(), tokenProvider.getHashPasswordHashFromJWT(token))) {
            userEntity.setPasswordHash(passwordEncoder.encode(newPassword));
        } else {
            throw new IncompatibilityDataException("The password cannot be reset again using the same token.","Hasło " +
                    "nie może być ponownie resetowane " +
                    "przy użyciu tego samego linku. Aby zresetować hasło wyślij ponownie maila resetującego hasło.");
        }

    }

    @Override
    public void changePassword(ChangePasswordDto dto) {
        UserEntity userEntity = userSessionService.getUser();
        
        if (passwordEncoder.matches(dto.getOldPassword(), userEntity.getPasswordHash())) {
            String newPasswordHash = passwordEncoder.encode(dto.getNewPassword());
            userEntity.setPasswordHash(newPasswordHash);
            repository.save(userEntity);
        } else {
            throw new IncompatibilityDataException("Old password is incorrect. User id: " + userEntity.getId(),"Podaj " +
                    "poprawne " +
                    "stare hasło aby " +
                    "zmienić je na nowe.");
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
                                                   "Nie można " +
                    "zmienić " +
                    "statusu własnego konta.");
        }
        UserEntity userEntity = findById(dto.getId());
        Validator.validateVersion(userEntity, dto.getVersion());

        userEntity.setActive(dto.getActive());
        userEntity = repository.saveAndFlush(userEntity);
        dto.setActive(userEntity.getActive());
        return dto;
    }

//    @Override
//    public void changeActiveStatus() {
//        UserEntity userEntity = userSessionService.getUser();
//        userEntity.setActive(false);
//        //userEntity.setConfrimationDate(null);
//        userIngredientRepository.deleteAllByUserIngredientKey_UserId(userEntity.getId());
//        repository.save(userEntity);
//    }

    @Override
    public void resendConfirmationEmail(ForgotPasswordOrResendConfirmationEmailDto dto) {
        UserEntity userEntity = findByEmail(dto.getEmail());
        if(userEntity.getLogin().equals(dto.getLogin())){
            if(!userEntity.getActive() && userEntity.getConfrimationDate() == null){
                sendActivationEmail(userEntity.getPasswordHash(), userEntity.getEmail());
            } else {
                if(!userEntity.getActive() && userEntity.getConfrimationDate() != null)
                sendActivationEmail(null, userEntity.getEmail());
            }
            if(userEntity.getActive()){
                throw  new IncompatibilityDataException("Account with id " + userEntity.getId()+" is active.","Twoje " +
                        "konto jest aktywne.");
            }
        } else {
            throw new IncompatibilityDataException("User with this login "+ userEntity.getLogin() +" and email "+userEntity.getEmail()+
                                                           " not " +
                                                           "exists.","Brak " +
                    "użytkownika " +
                    "o " +
                    "podanym loginie i emailu.");
        }


    }

}
