package com.sobczyk.food_management.services.interfaces;

import com.sobczyk.food_management.dtos.HeadersDto;
import com.sobczyk.food_management.dtos.IngredientDto;
import com.sobczyk.food_management.entities.IngredientEntity;

public interface IngredientService {

    IngredientEntity convertToEntity(IngredientDto dto);

    IngredientDto convertToDto(IngredientEntity entity);

    IngredientDto add(IngredientDto ingredient);

    IngredientDto update(IngredientDto dto);

    HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    IngredientEntity findById(Long id);

    void deleteById(Long id);
}
