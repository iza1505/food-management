package com.sobczyk.food_management.repositories;

import com.sobczyk.food_management.entities.IngredientEntity;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import com.sobczyk.food_management.entities.UserIngredientKey;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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
