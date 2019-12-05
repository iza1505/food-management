package com.food_management.services.interfaces;

import com.food_management.dtos.IngredientDto;
import com.food_management.entities.IngredientEntity;

public interface IngredientService  {

    IngredientEntity convertToEntity(IngredientDto dto);

    IngredientDto convertToDto(IngredientEntity entity);

    IngredientEntity findById(Long id) throws Exception;
}
