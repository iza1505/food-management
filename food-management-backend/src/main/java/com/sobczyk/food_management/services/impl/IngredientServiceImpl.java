package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.HeadersDto;
import com.sobczyk.food_management.dtos.IngredientDto;
import com.sobczyk.food_management.entities.*;
import com.sobczyk.food_management.exceptions.EmptyFieldException;
import com.sobczyk.food_management.exceptions.EntityAlreadyExistsException;
import com.sobczyk.food_management.exceptions.UnknowRoleException;
import com.sobczyk.food_management.exceptions.FMEntityNotFoundException;
import com.sobczyk.food_management.repositories.IngredientRepository;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.IngredientService;
import com.sobczyk.food_management.services.interfaces.MeasureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IngredientServiceImpl implements IngredientService {

    private ModelMapper modelMapper;
    private IngredientRepository repository;
    private UserSessionService userSessionService;
    private MeasureService measureService;
    private HeadersPaginationImpl headersPagination;

    @Autowired
    public IngredientServiceImpl(
            IngredientRepository repository,
            MeasureService measureService,
            ModelMapper modelMapper,
            @Lazy UserSessionService userSessionService,
            HeadersPaginationImpl headersPagination) {
        this.modelMapper = modelMapper;
        this.repository = repository;
        this.userSessionService = userSessionService;
        this.measureService = measureService;
        this.headersPagination = headersPagination;
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
            throw new EntityAlreadyExistsException(
                    "Ingredient with name " + ingredient.getIngredientName() + " already exists.", "exception.productWithNameExists");
        }

        if (ingredient.getIngredientName() == null) {
            throw new EmptyFieldException("Ingredient name cannot be null", "exception.emptyProductName");
        }

        if (ingredient.getMeasure() == null) {
            throw new EmptyFieldException("Measure cannot be null", "exception.emptyMeasure");
        }

        IngredientEntity ingredientEntity = convertToEntity(ingredient);
        UserEntity userEntity = userSessionService.getUser();

        ingredientEntity.setVersion(0L);
        ingredientEntity.setMeasure(measureService.findById(ingredient.getMeasure().getId()));

        if (userEntity.getRole().getName().equals("MANAGER")) {
            ingredientEntity.setActive(true);
        } else if (userEntity.getRole().getName().equals("USER")) {
            ingredientEntity.setActive(false);
        } else {
            throw new UnknowRoleException("Unknow role.","exception.unknownRole");
        }

        return convertToDto(repository.saveAndFlush(ingredientEntity));
    }

    @Override
    public IngredientDto update(IngredientDto dto) {
        IngredientEntity ingredientToUpdate = findById(dto.getId());

        Validator.validateVersion(ingredientToUpdate, dto.getVersion());
        ingredientToUpdate.setActive(true);
        ingredientToUpdate = repository.saveAndFlush(ingredientToUpdate);
        return convertToDto(ingredientToUpdate);
    }

    @Override
    public HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
        UserEntity userEntity = userSessionService.getUser();
        List<IngredientEntity> modelList = repository.findAll();
        if (userEntity.getRole().getName().equals("ADMINISTRATOR") || userEntity.getRole().getName().equals("MANAGER")) {
            List<IngredientDto> dtos = modelList
                    .stream()
                    .map(entity ->
                                 convertToDto(entity))
                    .collect(Collectors.toList());
            return headersPagination.createHeaderDto(elementsOnPage, currentPage, dtos, sortBy, ascendingSort);
        } else {
            if (userEntity.getRole().getName().equals("USER")) {
                List<IngredientDto> dtos = new ArrayList<>();
                for (IngredientEntity entity : modelList) {
                    if (entity.getActive()) {
                        dtos.add(convertToDto(entity));
                    }
                }
                return headersPagination.createHeaderDto(elementsOnPage, currentPage, dtos, sortBy, ascendingSort);

            } else {
                throw new UnknowRoleException("Unknow role.","exception.unknownRole");
            }
        }
    }

    @Override
    public List<IngredientDto> getAll() {
        List<IngredientEntity> modelList = repository.findAll();
        return modelList
                .stream()
                .map(this::convertToDto)
                .filter(dto -> dto.active.equals(true))
                .sorted(Comparator.comparing(IngredientDto::getIngredientName))
                .collect(Collectors.toList());
    }

    @Override
    public IngredientEntity findById(Long id) {
        return repository
                .findById(id)
                .orElseThrow(() -> new FMEntityNotFoundException("Ingredient with id " + id + " not exists.","exception.productNotExists"));
    }

    @Override
    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new FMEntityNotFoundException("Ingredient with id " + id + " not exists.","exception.productNotExists");
        }


        repository.deleteById(id);
    }
}
