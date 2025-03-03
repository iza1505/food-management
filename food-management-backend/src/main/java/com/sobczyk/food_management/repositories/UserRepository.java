package com.sobczyk.food_management.repositories;

import com.sobczyk.food_management.entities.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface UserRepository extends MyJpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByLogin(String login);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);

}
