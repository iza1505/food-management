package com.food_management.repositories;

import com.food_management.entities.UserIngredientEntity;
import com.food_management.entities.UserIngredientKey;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface UserIngredientRepository extends MyJpaRepository<UserIngredientEntity, UserIngredientKey> {

    Optional<UserIngredientEntity> findById(UserIngredientKey id);

    boolean existsById(UserIngredientKey id);

    void deleteById(UserIngredientKey id);
}
