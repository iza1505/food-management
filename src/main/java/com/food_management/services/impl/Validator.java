package com.food_management.services.impl;

import com.food_management.entities.BaseEntity;
import com.food_management.exceptions.BadVersionException;

public class Validator {
    public static <TModel extends BaseEntity> void validateVersion(TModel entity, Long dtoVersion) {
        if(entity.getVersion() != dtoVersion){
            throw new BadVersionException("Bad version. Entity " + entity.getClass().getSimpleName() + " version: " + entity.getVersion() + ", version from request: " + dtoVersion);
        }
    }
}
