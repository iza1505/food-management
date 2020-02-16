package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.MeasureDto;
import com.sobczyk.food_management.entities.MeasureEntity;
import com.sobczyk.food_management.exceptions.FMEntityNotFoundException;
import com.sobczyk.food_management.repositories.MeasureRepository;
import com.sobczyk.food_management.services.interfaces.MeasureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MeasureServiceImpl implements MeasureService {

    private ModelMapper modelMapper;
    private MeasureRepository repository;

    @Autowired
    public MeasureServiceImpl(
            MeasureRepository repository,
            ModelMapper modelMapper) {
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
        return repository.findById(id).orElseThrow(() -> new FMEntityNotFoundException("Measure with id " + id + " not found.",
                                                                            "exception.unknownMeasure"));

    }

}
