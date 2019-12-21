package com.food_management.services.interfaces;

import com.food_management.dtos.RoleDto;
import com.food_management.entities.RoleEntity;

import java.util.List;

public interface RoleService {

    RoleEntity convertToEntity(RoleDto dto);

    RoleDto convertToDto(RoleEntity entity);

    RoleDto update(RoleDto dto);

    List<RoleDto> findAll();

    RoleEntity findByName(String name);

}
