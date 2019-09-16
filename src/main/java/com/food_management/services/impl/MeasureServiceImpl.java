package com.food_management.services.impl;

import com.food_management.dtos.MeasureDto;
import com.food_management.entities.MeasureEntity;
import com.food_management.repositories.MeasureRepository;
import com.food_management.services.interfaces.MeasureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeasureServiceImpl extends BaseServiceImpl<MeasureRepository, MeasureEntity, MeasureDto> implements MeasureService {

    @Autowired
    public MeasureServiceImpl(MeasureRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper);
    }

    @Override
    public MeasureDto convertToDto(MeasureEntity entity) {
        return modelMapper.map(entity, MeasureDto.class);
    }

    @Override
    public MeasureEntity convertToEntity(MeasureDto dto) {
        return modelMapper.map(dto, MeasureEntity.class);
    }
}
