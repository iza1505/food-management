package com.food_management.services.impl;

import com.food_management.dtos.UserDto;
import com.food_management.entities.UserEntity;
import com.food_management.entities.UserIngredientEntity;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.repositories.UserRepository;
import com.food_management.services.interfaces.RoleService;
import com.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, UserDto> implements UserService {

    private RoleService roleService;
    private AuthenticationManager authenticationManager;
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(
            UserRepository repository,
            RoleService roleService,
            ModelMapper modelMapper,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        super(repository, modelMapper);
        this.authenticationManager = authenticationManager;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
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
    public  UserDto update(UserDto dto) {
        UserEntity userToUpdate = repository.getOne(dto.getId());
        Validator.validateVersion(userToUpdate,dto.getVersion());

        userToUpdate.setEmail(dto.getEmail());
        userToUpdate = repository.saveAndFlush(userToUpdate);
        return  convertToDto(userToUpdate);
    }

    @Override
    public UserEntity findByLogin(String login) {
        return repository.findByLogin(login)
                .orElseThrow(() -> new EntityNotFoundException("User with login " + login + " not found."));
    }

    public UserEntity findByIdEntity(Long id) {
        Optional<UserEntity> userOptional = repository.findById(id);
        return userOptional.orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found."));
    }


    @Override
    public Authentication authenticate(String login, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
    }

}
