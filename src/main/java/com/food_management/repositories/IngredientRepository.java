package com.food_management.repositories;

import com.food_management.entities.IngredientEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface IngredientRepository extends MyJpaRepository<IngredientEntity, Long> {

    List<IngredientEntity> findAll();

    Optional<IngredientEntity> findById(Long id);

    boolean existsByIngredientName(String ingredientName);
}
