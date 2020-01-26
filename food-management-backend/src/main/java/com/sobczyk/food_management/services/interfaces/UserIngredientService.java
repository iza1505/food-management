package com.sobczyk.food_management.services.interfaces;

import com.sobczyk.food_management.dtos.IngredientInFridgeAndRecipeDto;
import com.sobczyk.food_management.dtos.UserIngredientDto;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import com.sobczyk.food_management.entities.UserIngredientKey;

import java.util.List;

public interface UserIngredientService {

    UserIngredientDto convertToDto(UserIngredientEntity entity);

    UserIngredientEntity convertToEntity(UserIngredientDto dto);

    List<IngredientInFridgeAndRecipeDto> findAll();

    IngredientInFridgeAndRecipeDto update(IngredientInFridgeAndRecipeDto dto);

    void delete(Long id);

    IngredientInFridgeAndRecipeDto add(IngredientInFridgeAndRecipeDto dto);

    UserIngredientEntity findById(UserIngredientKey id);
}
