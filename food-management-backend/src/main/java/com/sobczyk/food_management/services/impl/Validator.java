package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.entities.BaseEntity;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import com.sobczyk.food_management.exceptions.BadVersionException;

public class Validator {
    public static <TModel extends BaseEntity> void validateVersion(TModel entity, Long dtoVersion) {
        if (entity.getVersion() != dtoVersion) {
            throw new BadVersionException(
                    "Incompatible versions. Entity " + entity.getClass().getSimpleName() + " version: " + entity.getVersion() +
                            ", version from request: " + dtoVersion);
        }
    }

    public static void validateVersionUserIngredientEntity(UserIngredientEntity entity, Long dtoVersion) {
        if (entity.getVersion() != dtoVersion) {
            throw new BadVersionException(
                    "Incompatible versions. UserIngredientEntity version: " + entity.getVersion() +
                            ", version from request: " + dtoVersion);
        }
    }
}
