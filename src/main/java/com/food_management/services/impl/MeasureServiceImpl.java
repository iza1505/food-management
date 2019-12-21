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

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MeasureServiceImpl implements MeasureService {

    private ModelMapper modelMapper;
    private MeasureRepository repository;

    @Autowired
    public MeasureServiceImpl(MeasureRepository repository, ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        this.repository = repository;

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
    public List<MeasureDto> findAll() {
        List<MeasureEntity> modelList = repository.findAll();
        return modelList
                .stream()
                .map(entity ->
                        convertToDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public MeasureEntity findById(Long id) {
        Optional<MeasureEntity> userOptional = repository.findById(id);
        return userOptional.orElseThrow(() -> new EntityNotFoundException("Measure with id " + id + " not found."));

    }
//    @Override
//    public MeasureDto add(MeasureDto measure) {
//        if (repository.existsByMeasureName(measure.getMeasureName())) {
//            throw new EntityAlreadyExistsException("Measure with name " + measure.getMeasureName() + " already exists.");
//        }
//
//        if(measure.getMeasureName() == null){
//            throw new EmptyFieldException("Measure name cannot be null");
//        }
//
//        MeasureEntity measureEntity = convertToEntity(measure);
//
//        measureEntity.setVersion(0L);
//
//        return convertToDto(repository.saveAndFlush(measureEntity));
//    }
//
//    @Override
//    public  MeasureDto update(MeasureDto dto) {
//        MeasureEntity measureToUpdate = repository.getOne(dto.getId());
//        Validator.validateVersion(measureToUpdate,dto.getVersion());
//
//        measureToUpdate.setMeasureName(dto.getMeasureName());
//        measureToUpdate = repository.saveAndFlush(measureToUpdate);
//        return  convertToDto(measureToUpdate);
//    }
}
