package com.food_management.services.interfaces;

import com.food_management.dtos.*;
import com.food_management.entities.RecipeEntity;

import java.util.List;

public interface RecipeService extends BaseService<RecipeEntity, RecipeDto> {
    //Boolean checkIfActive(Long id);

    List<RecipeHeaderAdminDto> findAllNoActive();

    List<RecipeEntity> findAllActive();

    RecipeHeadersDto findAllForUser(Integer possibleMissingIngredientsAmount, Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeHeadersDto findAllForAdmin(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeHeadersDto findAllForAuthor(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    RecipeDto updateStatus(Long id, RecipeChangeStatusDto dto) throws Exception;
}
