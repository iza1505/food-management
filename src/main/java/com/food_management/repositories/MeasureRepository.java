package com.food_management.repositories;

import com.food_management.entities.Measure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeasureRepository extends JpaRepository<Measure, Long> {
    List<Measure> findAll();

    @Override
    Optional<Measure> findById(Long id);
}
