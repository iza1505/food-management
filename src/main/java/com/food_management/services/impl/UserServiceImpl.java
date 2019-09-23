package com.food_management.services.impl;

import com.food_management.dtos.RoleDto;
import com.food_management.dtos.UserDto;
import com.food_management.entities.RoleEntity;
import com.food_management.entities.UserEntity;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.repositories.RoleRepository;
import com.food_management.repositories.UserRepository;
import com.food_management.services.interfaces.RoleService;
import com.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, UserDto> implements UserService {

    private RoleRepository roleRepository;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;

    @Autowired
    public UserServiceImpl(
            UserRepository repository,
            RoleRepository roleRepository,
            ModelMapper modelMapper,
            @Lazy AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleService roleService,
            PasswordEncoder passwordEncoder) {
        super(repository, modelMapper);
        this.roleService = roleService;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    public  UserDto update(Long id, UserDto dto) {
        UserEntity userToUpdate = repository.getOne(id);
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

    @Override
    public Authentication authenticate(String login, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
    }

    @Override
    public UserDto add(UserDto user) {
        if (userRepository.existsByLogin(user.getLogin())) {
            throw new EntityAlreadyExistsException("User with login " + user.getLogin() + " already exists.");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
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
            userEntity.setRole(roleRepository.findByName("USER"));
        }
        else{
            userEntity.setRole(roleRepository.findByName(user.getRole().getName()));
        }

        return convertToDto(repository.saveAndFlush(userEntity));
    }

}
