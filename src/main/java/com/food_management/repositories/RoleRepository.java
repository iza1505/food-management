package com.food_management.repositories;

import com.food_management.entities.RoleEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface RoleRepository extends MyJpaRepository<RoleEntity, Long> {

    List<RoleEntity> findAll();

    Optional<RoleEntity> findById(Long id);

    RoleEntity findByName(String name);

}
