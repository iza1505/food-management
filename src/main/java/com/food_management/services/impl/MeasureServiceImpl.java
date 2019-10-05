package com.food_management.services.impl;

import com.food_management.dtos.MeasureDto;
import com.food_management.entities.MeasureEntity;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.repositories.MeasureRepository;
import com.food_management.services.interfaces.MeasureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
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

    @Override
    public MeasureDto add(MeasureDto measure) {
        if (repository.existsByMeasureName(measure.getMeasureName())) {
            throw new EntityAlreadyExistsException("Measure with name " + measure.getMeasureName() + " already exists.");
        }

        if(measure.getMeasureName() == null){
            throw new EmptyFieldException("Measure name cannot be null");
        }

        MeasureEntity measureEntity = convertToEntity(measure);

        measureEntity.setVersion(0L);

        return convertToDto(repository.saveAndFlush(measureEntity));
    }

    @Override
    public  MeasureDto update(MeasureDto dto) {
        MeasureEntity measureToUpdate = repository.getOne(dto.getId());
        Validator.validateVersion(measureToUpdate,dto.getVersion());

        measureToUpdate.setMeasureName(dto.getMeasureName());
        measureToUpdate = repository.saveAndFlush(measureToUpdate);
        return  convertToDto(measureToUpdate);
    }
}
