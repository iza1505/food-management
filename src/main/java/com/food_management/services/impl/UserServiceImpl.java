package com.food_management.services.impl;

import com.food_management.dtos.MyDetailsUserDto;
import com.food_management.dtos.UserDetailsToChangeDto;
import com.food_management.dtos.UserDto;
import com.food_management.dtos.UsersDetailsDto;
import com.food_management.entities.UserEntity;
import com.food_management.entities.UserIngredientEntity;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
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

    @Autowired
    public UserServiceImpl(
            @Lazy UserSessionService userSessionService,
            UserRepository repository,
            RoleService roleService,
            ModelMapper modelMapper,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            EmailProvider emailProvider, ModelMapper modelMapper1) {
        this.userSessionService = userSessionService;
        this.authenticationManager = authenticationManager;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.tokenProvider = tokenProvider;
        this.emailProvider = emailProvider;
        this.modelMapper = modelMapper1;
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
    public UserDto add(UserDto user) {
        if (repository.existsByLogin(user.getLogin())) {
            throw new EntityAlreadyExistsException("User with login " + user.getLogin() + " already exists.");
        }
        if (repository.existsByEmail(user.getEmail())) {
            throw new EntityAlreadyExistsException("User with email " + user.getEmail() + " already exists.");
        }
        if(user.getPasswordHash() == null){
            throw new EmptyFieldException("Password cannot be null");
        }

        if(user.getLogin() == null){
            throw new EmptyFieldException("Login cannot be null");
        }

        if(user.getEmail() == null){
            throw new EmptyFieldException("Email cannot be null");
        }

        UserEntity userEntity = convertToEntity(user);

        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        userEntity.setPasswordHash(hashedPassword);

        userEntity.setVersion(0L);

        if(user.getRole()==null){
            userEntity.setRole(roleService.findByName("USER"));
        }
        else{
            userEntity.setRole(roleService.findByName(user.getRole().getName()));
        }

        return convertToDto(repository.saveAndFlush(userEntity));
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
    public List<UsersDetailsDto> findAll() {

return null; //TODO: zaimplementowac
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
        String passwordHash = findByEmail(email).getPasswordHash();
        String jwt = tokenProvider.generatePasswordToken(email, passwordHash);
        SimpleMailMessage emailToSend = emailProvider.constructResetPasswordEmail(jwt, email, "/auth/forgotPassword?token=");
        emailProvider.sendEmail(emailToSend);
    }

    @Override
    public void resetPassword(String newPassword, String token){
        String userEmail = tokenProvider.getEmailFromJWT(token);
        UserEntity userEntity = findByEmail(userEmail);
        userEntity.setPasswordHash(passwordEncoder.encode(newPassword));
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
