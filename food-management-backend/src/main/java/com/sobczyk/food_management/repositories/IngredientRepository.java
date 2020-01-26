package com.sobczyk.food_management.repositories;

import com.sobczyk.food_management.entities.IngredientEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface IngredientRepository extends MyJpaRepository<IngredientEntity, Long> {

    boolean existsByIngredientName(String ingredientName);

}
