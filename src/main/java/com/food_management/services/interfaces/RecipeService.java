package com.food_management.services.interfaces;

import com.food_management.dtos.RecipeChangeStatusDto;
import com.food_management.dtos.RecipeDto;
import com.food_management.dtos.RecipeHeaderAdmin;
import com.food_management.entities.RecipeEntity;

import java.util.List;

public interface RecipeService extends BaseService<RecipeEntity, RecipeDto> {
    //Boolean checkIfActive(Long id);

    List<RecipeHeaderAdmin> findAllNoActive();

    void updateStatus(Long id, RecipeChangeStatusDto dto) throws Exception;
}
