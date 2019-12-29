package com.sobczyk.food_management.repositories;

import com.sobczyk.food_management.entities.RecipeIngredientEntity;
import com.sobczyk.food_management.entities.RecipeIngredientKey;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface RecipeIngredientRepository extends MyJpaRepository<RecipeIngredientEntity, RecipeIngredientKey> {

    void deleteAllByRecipeIngredientKey_RecipeId(Long id);
}
