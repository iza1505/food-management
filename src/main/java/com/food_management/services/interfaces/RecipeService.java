package com.food_management.services.interfaces;

import com.food_management.dtos.*;
import com.food_management.entities.RecipeEntity;

import java.util.List;
//extends BaseService<RecipeEntity, RecipeDto>
public interface RecipeService  {

    void add(RecipeDto dto) throws Exception;

    List<RecipeEntity> findAllActive();

    RecipeHeadersDto findAllForUser(Integer possibleMissingIngredientsAmount, Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeHeadersDto findAllForAdmin(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeHeadersDto findAllForAuthor(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeDto updateStatus(Long id, RecipeChangeStatusDto dto) throws Exception;

    RecipeDto getRecipeAdmin(Long id);

    RecipeGetUserDto getRecipeUser(Long id);

    void updateRecipe(Long id, RecipeUpdateDto recipeUpdateDto) throws Exception;
}
