package com.sobczyk.food_management.services.interfaces;

import com.sobczyk.food_management.dtos.RoleDto;
import com.sobczyk.food_management.entities.RoleEntity;

import java.util.List;

public interface RoleService {

    RoleEntity convertToEntity(RoleDto dto);

    RoleDto convertToDto(RoleEntity entity);

    List<RoleDto> findAll();

    RoleEntity findByName(String name);

}
