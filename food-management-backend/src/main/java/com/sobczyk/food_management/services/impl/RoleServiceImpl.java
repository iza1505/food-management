package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.RoleDto;
import com.sobczyk.food_management.entities.RoleEntity;
import com.sobczyk.food_management.exceptions.FMEntityNotFoundException;
import com.sobczyk.food_management.repositories.RoleRepository;
import com.sobczyk.food_management.services.interfaces.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private RoleRepository repository;
    private ModelMapper modelMapper;

    @Autowired
    public RoleServiceImpl(RoleRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
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
    public List<RoleDto> findAll() {
        List<RoleEntity> modelList = repository.findAll();
        return modelList
                .stream()
                .map(entity ->
                             convertToDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public RoleEntity findByName(String name) {
        return repository.findByName(name).orElseThrow(() -> new FMEntityNotFoundException("Role with name " + name +
                                                                                                   " " +
                                                                                                   "not found.",
                                                                                           "exception.unknownRole"));
    }
}
