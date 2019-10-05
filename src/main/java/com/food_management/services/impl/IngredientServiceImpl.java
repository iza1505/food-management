package com.food_management.services.impl;

import com.food_management.dtos.IngredientDto;
import com.food_management.entities.IngredientEntity;
import com.food_management.entities.MeasureEntity;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.repositories.IngredientRepository;
import com.food_management.repositories.MeasureRepository;
import com.food_management.services.interfaces.IngredientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Transactional
public class IngredientServiceImpl extends BaseServiceImpl<IngredientRepository, IngredientEntity, IngredientDto> implements IngredientService {

    protected MeasureRepository measureRepository;

    @Autowired
    public IngredientServiceImpl(IngredientRepository repository, MeasureRepository measureRepository, ModelMapper modelMapper) {
        super(repository,  modelMapper);
        this.measureRepository = measureRepository;
    }

    @Override
    public IngredientDto convertToDto(IngredientEntity entity) {
        return modelMapper.map(entity, IngredientDto.class);
    }

    @Override
    public IngredientEntity convertToEntity(IngredientDto dto) {
        return modelMapper.map(dto, IngredientEntity.class);
    }

    @Override
    public IngredientDto add(IngredientDto ingredient) {
        if (repository.existsByIngredientName(ingredient.getIngredientName())) {
            throw new EntityAlreadyExistsException("Ingredient with name " + ingredient.getIngredientName() + " already exists.");
        }

        if (ingredient.getMeasure() == null){
            throw new EmptyFieldException("Measure cannot be null");
        }

        IngredientEntity ingredientEntityEntity = convertToEntity(ingredient);

        ingredientEntityEntity.setVersion(0L);

        return convertToDto(repository.saveAndFlush(ingredientEntityEntity));
    }

    @Override
    public  IngredientDto update(IngredientDto dto) {
        IngredientEntity ingredientToUpdate = repository.getOne(dto.getId());
        Validator.validateVersion(ingredientToUpdate,dto.getVersion());
        MeasureEntity measureEntity = measureRepository.getOne(dto.getMeasure().getId());
        Validator.validateVersion(measureEntity,dto.getMeasure().getVersion());

        ingredientToUpdate.setIngredientName(dto.getIngredientName());
        ingredientToUpdate.setMeasure(measureEntity);
        ingredientToUpdate = repository.saveAndFlush(ingredientToUpdate);
        return  convertToDto(ingredientToUpdate);
    }
}
