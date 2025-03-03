package com.sobczyk.food_management.repositories;

import com.sobczyk.food_management.entities.MeasureEntity;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface MeasureRepository extends MyJpaRepository<MeasureEntity, Long> {

}
