package com.sobczyk.food_management.services.interfaces;

import com.sobczyk.food_management.dtos.MeasureDto;
import com.sobczyk.food_management.entities.MeasureEntity;

import java.util.List;

public interface MeasureService {

    MeasureEntity convertToEntity(MeasureDto dto);

    MeasureDto convertToDto(MeasureEntity entity);

    List<MeasureDto> findAll();

    MeasureEntity findById(Long id);

}
