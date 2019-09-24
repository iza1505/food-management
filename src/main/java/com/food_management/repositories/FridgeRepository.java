package com.food_management.repositories;

import com.food_management.dtos.FridgeIDDto;
import com.food_management.entities.FridgeEntity;
import com.food_management.entities.FridgeID;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface FridgeRepository extends MyJpaRepository<FridgeEntity, FridgeID> {

    Optional<FridgeEntity> findById(FridgeID id);

    boolean existsById(FridgeID id);

    void deleteById(FridgeID id);
}
