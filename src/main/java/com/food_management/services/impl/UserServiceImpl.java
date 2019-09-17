package com.food_management.services.impl;

import com.food_management.dtos.UserDto;
import com.food_management.entities.UserEntity;
import com.food_management.repositories.UserRepository;
import com.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserRepository, UserEntity, UserDto> implements UserService {
    @Autowired
    public UserServiceImpl(UserRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper);
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
        //userToUpdate.setName(dto.getName());
        userToUpdate = repository.saveAndFlush(userToUpdate);
        return  convertToDto(userToUpdate);
    }
}
