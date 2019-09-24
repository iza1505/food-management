package com.food_management.services.impl;

import com.food_management.dtos.FridgeDto;
import com.food_management.dtos.FridgeIDDto;
import com.food_management.entities.FridgeEntity;
import com.food_management.entities.FridgeID;
import com.food_management.repositories.FridgeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FridgeServiceImpl  {

    protected FridgeRepository repository;
    protected ModelMapper modelMapper;

    @Autowired
    public FridgeServiceImpl(FridgeRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    public FridgeDto convertToDto(FridgeEntity entity) {
        return modelMapper.map(entity, FridgeDto.class);
    }

    public FridgeEntity convertToEntity(FridgeDto dto) {
        return modelMapper.map(dto, FridgeEntity.class);
    }

    protected EntityNotFoundException entityNotFoundException(FridgeID id, String name) {
        return new EntityNotFoundException(name + " with id user " + id.getUserId() + ", id ingredient " + id.getIngredientId() + "  not found.");
    }

    public List<FridgeDto> findAll() {
        List<FridgeEntity> modelList = repository.findAll();
        return modelList
                .stream()
                .map(entity ->
                        convertToDto(entity))
                .collect(Collectors.toList());
    }

    public FridgeDto add(FridgeDto dto){
        FridgeEntity savedEntity = repository.save(convertToEntity(dto));
        savedEntity.setVersion(0L);
        return convertToDto(savedEntity);
    }

    //FridgeDto update(Long id, FridgeDto dto);

    public void deleteById(FridgeID id){
        if (!repository.existsById(id)) {
            throw entityNotFoundException(id,"Entity");
        }
        repository.deleteById(id);
    }

    public FridgeDto findById(FridgeID id) {
        FridgeEntity model = repository
                .findById(id)
                .orElseThrow(() -> entityNotFoundException(id, "Entity"));
        return convertToDto(model);
    }

}
