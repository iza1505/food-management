package com.food_management.repositories;

import com.food_management.entities.RecipeEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface RecipeRepository extends MyJpaRepository<RecipeEntity, Long> {
}
