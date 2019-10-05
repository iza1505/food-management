package com.food_management.services.impl;

import com.food_management.dtos.RoleDto;
import com.food_management.entities.RoleEntity;
import com.food_management.repositories.RoleRepository;
import com.food_management.services.interfaces.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RoleServiceImpl extends BaseServiceImpl<RoleRepository, RoleEntity, RoleDto> implements RoleService {

    @Autowired
    public RoleServiceImpl(RoleRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper);
    }

    @Override
    public RoleDto convertToDto(RoleEntity entity) {
        return modelMapper.map(entity, RoleDto.class);
    }

    @Override
    public RoleEntity convertToEntity(RoleDto dto) {
        return modelMapper.map(dto, RoleEntity.class);
    }

    @Override
    public  RoleDto update(RoleDto dto) {
        RoleEntity roleToUpdate = repository.getOne(dto.getId());
        Validator.validateVersion(roleToUpdate,dto.getVersion());

        roleToUpdate.setName(dto.getName());
        roleToUpdate = repository.saveAndFlush(roleToUpdate);
        return  convertToDto(roleToUpdate);
    }

    public RoleEntity findByName(String name) {
        return repository.findByName(name);
    }
}
