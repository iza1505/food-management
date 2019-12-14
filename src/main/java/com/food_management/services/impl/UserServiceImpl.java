package com.food_management.services.impl;

import com.food_management.dtos.*;
import com.food_management.entities.UserEntity;
import com.food_management.entities.UserIngredientEntity;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.exceptions.IncompatibilityDataException;
import com.food_management.repositories.UserRepository;
import com.food_management.security.EmailProvider;
import com.food_management.security.JwtTokenProvider;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.RoleService;
import com.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserSessionService userSessionService;
    private RoleService roleService;
    private AuthenticationManager authenticationManager;
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;
    private EmailProvider emailProvider;
    private final JwtTokenProvider tokenProvider;
    private ModelMapper modelMapper;
    private HeadersPagination headersPagination;

    @Autowired
    public UserServiceImpl(
            @Lazy UserSessionService userSessionService,
            UserRepository repository,
            RoleService roleService,
            ModelMapper modelMapper,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            EmailProvider emailProvider, ModelMapper modelMapper1, HeadersPagination headersPagination) {
        this.userSessionService = userSessionService;
        this.authenticationManager = authenticationManager;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.tokenProvider = tokenProvider;
        this.emailProvider = emailProvider;
        this.modelMapper = modelMapper1;
        this.headersPagination = headersPagination;
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
        if (repository.existsByLogin(registrationDto.getLogin())) {
            throw new EntityAlreadyExistsException("User with login " + registrationDto.getLogin() + " already exists.");
        }
        if (repository.existsByEmail(registrationDto.getEmail())) {
            throw new EntityAlreadyExistsException("User with email " + registrationDto.getEmail() + " already exists.");
        }
        if(registrationDto.getPassword() == null){
            throw new EmptyFieldException("Password cannot be null");
        }

        if(registrationDto.getLogin() == null){
            throw new EmptyFieldException("Login cannot be null");
        }

        if(registrationDto.getEmail() == null){
            throw new EmptyFieldException("Email cannot be null");
        }

        UserDto userDto = new UserDto();
        userDto.setActive(false);
        userDto.setEmail(registrationDto.getEmail());
        userDto.setLogin(registrationDto.getLogin());
        String hashedPassword = passwordEncoder.encode(registrationDto.getPassword());
        userDto.setPasswordHash(hashedPassword);
        userDto.setVersion(0L);

        UserEntity userEntity = convertToEntity(userDto);

        if(registrationDto.getRole()==null){
            userEntity.setRole(roleService.findByName("USER"));
        }
        else{
            userEntity.setRole(roleService.findByName(registrationDto.getRole().getName()));
        }

        repository.save(userEntity);
        //send mail

        String hashPasswordHash = passwordEncoder.encode(hashedPassword);
        String jwt = tokenProvider.generatePasswordToken(registrationDto.getEmail(), hashPasswordHash);
        SimpleMailMessage emailToSend = emailProvider.constructResetPasswordEmail(jwt, registrationDto.getEmail(), "/auth/registration?token=", "Account activation", "Active your account using link");
        emailProvider.sendEmail(emailToSend);
    }

    @Override
    public void confirmAccount(String token) throws Exception {
        String email = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(email);
        if(userEntity != null){
            if(passwordEncoder.matches(userEntity.getPasswordHash(),tokenProvider.getHashPasswordHashFromJWT(token))){
                if(userEntity.getActive().equals(false)){
                    userEntity.setActive(true);
                    repository.save(userEntity);
                } else {
                    throw new Exception("Uzytkownik juz aktywowany");
                }
            } else {
                throw new Exception("Haslo przy zakladaniu konta i obecnie sa rozne");
            }
        } else {
            throw new Exception("Brak uzytkownika o podanym mailu");
        } //TODO: return exceptiony
    }

    @Override
    public UserDetailsToChangeDto updateDetails(UserDetailsToChangeDto dto) {
        UserEntity userToUpdate = findByEmail(dto.getEmail());
        Validator.validateVersion(userToUpdate,dto.getVersion());

        userToUpdate.setEmail(dto.getEmail());
        userToUpdate = repository.saveAndFlush(userToUpdate);

        UserDetailsToChangeDto newDto = new UserDetailsToChangeDto();
        newDto.setEmail(userToUpdate.getEmail());
        newDto.setVersion(userToUpdate.getVersion());

        return  newDto;
    }

    @Override
    public HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
       List<UserEntity> userEntities = repository.findAll();
       List<UsersDetailsDto> dtos = new ArrayList<>();
       for (UserEntity userEntity : userEntities){
           dtos.add(new UsersDetailsDto());
           dtos.get(dtos.size()-1).setActive(userEntity.getActive());
           dtos.get(dtos.size()-1).setRole(userEntity.getRole().getName());
           dtos.get(dtos.size()-1).setEmail(userEntity.getEmail());
           dtos.get(dtos.size()-1).setId(userEntity.getId());
           dtos.get(dtos.size()-1).setLogin(userEntity.getLogin());
           dtos.get(dtos.size()-1).setVersion(userEntity.getVersion());
       }
        return headersPagination.createHeaderDto(elementsOnPage, currentPage, dtos, sortBy, ascendingSort);
    }

    @Override
    public UserEntity findByLogin(String login) {
        return repository.findByLogin(login)
                .orElseThrow(() -> new EntityNotFoundException("User with login " + login + " not found."));
    }

    @Override
    public UserEntity findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email " + email + " not found."));
    }

    public UserEntity findById(Long id) {
        Optional<UserEntity> userOptional = repository.findById(id);
        return userOptional.orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found."));
    }


    @Override
    public Authentication authenticate(String login, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
    }

    @Override
    public Integer getIngredientPercentage(Long id, List<UserIngredientEntity> userIngredients){
        for(UserIngredientEntity ingredient: userIngredients){
            if(ingredient.getUserIngredientKey().getIngredient().getId().equals(id)){
                return ingredient.getAmount().intValue();
            }
        }
        return 0;

    }

    @Override
    public void forgotPassword(String email){
        String passwordHash = passwordEncoder.encode(findByEmail(email).getPasswordHash());
        String jwt = tokenProvider.generatePasswordToken(email, passwordHash);
        SimpleMailMessage emailToSend = emailProvider.constructResetPasswordEmail(jwt, email, "/auth/forgotPassword?token=", "Reset Password", "Reset your password using link:");
        emailProvider.sendEmail(emailToSend);
    }

    @Override
    public void resetForgottenPassword(String newPassword, String token){
        String userEmail = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(userEmail);
        userEntity.setPasswordHash(passwordEncoder.encode(newPassword));
    }

    @Override
    public void sendChangePasswordLink(String email){
        String passwordHash = passwordEncoder.encode(findByEmail(email).getPasswordHash());
        String jwt = tokenProvider.generatePasswordToken(email, passwordHash);
        SimpleMailMessage emailToSend = emailProvider.constructResetPasswordEmail(jwt, email, "/users/myAccount/changePassword?token=", "Change Password", "Change your password using link:");
        emailProvider.sendEmail(emailToSend);
    }

    @Override
    public void changePassword(String newPassword, String token){
        UserEntity userEntity = userSessionService.getUser();
        String tokenEmail = tokenProvider.getEmailFromJWT(token);
        if(userEntity.getEmail().equals(tokenEmail) &&
                passwordEncoder.matches(userEntity.getPasswordHash(),tokenProvider.getHashPasswordHashFromJWT(token))){
            String newPasswordHash = passwordEncoder.encode(newPassword);
            userEntity.setPasswordHash(newPasswordHash);
            repository.save(userEntity);
        } else {
            throw new IncompatibilityDataException("Incompatibility data.");
        }
    }

    @Override
    public MyDetailsUserDto getMyDetails(){
        UserEntity userEntity = userSessionService.getUser();

        MyDetailsUserDto newDto = new MyDetailsUserDto();
        newDto.setEmail(userEntity.getEmail());
        newDto.setId(userEntity.getId());
        newDto.setLogin(userEntity.getLogin());
        newDto.setVersion(userEntity.getVersion());

        return newDto;
    }

}
