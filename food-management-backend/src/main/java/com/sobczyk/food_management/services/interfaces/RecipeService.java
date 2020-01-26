package com.sobczyk.food_management.services.interfaces;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.entities.RecipeEntity;
import com.sobczyk.food_management.entities.RecipeIngredientEntity;
import com.sobczyk.food_management.entities.UserEntity;

import java.util.List;

public interface RecipeService {

    RecipeEntity findById(Long id);

    RecipeDto convertToDto(RecipeEntity entity);

    RecipeEntity convertToEntity(RecipeDto dto);

    void add(RecipeDto dto);

    List<RecipeEntity> findAllActive();

    HeadersDto findAllForUser(Integer possibleMissingIngredientsAmount, Integer elementsOnPage, Integer currentPage,
                              String sortBy, Boolean ascendingSort);

    HeadersDto findAllForAdmin(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    HeadersDto findAllForAuthor(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeDto updateStatus(Long id, RecipeChangeStatusDto dto);

    RecipeDto getRecipeAdmin(Long id);

    RecipeGetUserDto getRecipeUser(Long id);

    Integer checkIfIngredientInFridgeAndReturnPercentageToCook(UserEntity userEntity,
                                                               RecipeIngredientEntity recipeIngredientEntity);

    void updateRecipe(Long id, RecipeUpdateDto recipeUpdateDto);

    RecipeEntity addIngredientToRecipeEntity(RecipeEntity recipeEntity, Long id,
                                             List<IngredientInFridgeAndRecipeDto> ingredients);

    void delete(Long id);
}
