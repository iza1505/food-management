package com.food_management.services.impl;

import com.food_management.dtos.HeadersDto;
import com.food_management.dtos.IngredientDto;
import com.food_management.entities.*;
import com.food_management.exceptions.EmptyFieldException;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.exceptions.UnknowRoleException;
import com.food_management.repositories.IngredientRepository;
import com.food_management.repositories.MeasureRepository;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.IngredientService;
import com.food_management.services.interfaces.MeasureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IngredientServiceImpl implements IngredientService {

    private ModelMapper modelMapper;
    private IngredientRepository repository;
    private MeasureRepository measureRepository;
    private UserSessionService userSessionService;
    private MeasureService measureService;
    private HeadersPagination headersPagination;

    @Autowired
    public IngredientServiceImpl(IngredientRepository repository, MeasureService measureService, MeasureRepository measureRepository, ModelMapper modelMapper, @Lazy UserSessionService userSessionService, HeadersPagination headersPagination) {
        this.modelMapper = modelMapper;
        this.repository = repository;
        this.measureRepository = measureRepository; //TODO: zmienci zeby nie bylo repo
        this.userSessionService = userSessionService;
        this.measureService = measureService;
        this.headersPagination = headersPagination;
    }

   // @Override
    public IngredientDto convertToDto(IngredientEntity entity) {
        return modelMapper.map(entity, IngredientDto.class);
    }

    //@Override
    public IngredientEntity convertToEntity(IngredientDto dto) {
        return modelMapper.map(dto, IngredientEntity.class);
    }


    public IngredientDto add(IngredientDto ingredient) throws Exception {
        if (repository.existsByIngredientName(ingredient.getIngredientName())) {
            throw new EntityAlreadyExistsException("Ingredient with name " + ingredient.getIngredientName() + " already exists.");
        }

        if (ingredient.getMeasure() == null){
            throw new EmptyFieldException("Measure cannot be null");
        }

        IngredientEntity ingredientEntity = convertToEntity(ingredient);
        UserEntity userEntity = userSessionService.getUser();

        ingredientEntity.setVersion(0L);
        ingredientEntity.setMeasure(measureService.findById(ingredient.getMeasure().getId()));

        if(userEntity.getRole().getName().equals("ADMINISTRATOR")){
            ingredientEntity.setActive(true);
        }
        else if(userEntity.getRole().getName().equals("USER")){
            ingredientEntity.setActive(false);
        }
        else {
            throw new Exception("nieznana rola");
        }

        return convertToDto(repository.saveAndFlush(ingredientEntity));
    }

    //@Override
    public  IngredientDto update(IngredientDto dto) {
        IngredientEntity ingredientToUpdate = repository.getOne(dto.getId());
        Validator.validateVersion(ingredientToUpdate,dto.getVersion());
        MeasureEntity measureEntity = measureRepository.getOne(dto.getMeasure().getId());
        Validator.validateVersion(measureEntity,dto.getMeasure().getVersion());

        ingredientToUpdate.setIngredientName(dto.getIngredientName());
        ingredientToUpdate.setMeasure(measureEntity);
        ingredientToUpdate.setActive(dto.getActive());
        ingredientToUpdate = repository.saveAndFlush(ingredientToUpdate);
        return  convertToDto(ingredientToUpdate);
    }

    @Override
    public HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
        UserEntity userEntity = userSessionService.getUser();
        List<IngredientEntity> modelList = repository.findAll();
        if(userEntity.getRole().getName().equals("ADMINISTRATOR")){
            List<IngredientDto> dtos = modelList
                    .stream()
                    .map(entity ->
                            convertToDto(entity))
                    .collect(Collectors.toList());
            return headersPagination.createHeaderDto(elementsOnPage, currentPage, dtos, sortBy, ascendingSort);
        } else {
            if(userEntity.getRole().getName().equals("USER")){
                List<IngredientDto> dtos = new ArrayList<>();
                for(IngredientEntity entity : modelList){
                    if(entity.getActive()){
                        dtos.add(convertToDto(entity));
                    }
                }
                return headersPagination.createHeaderDto(elementsOnPage, currentPage, dtos, sortBy, ascendingSort);

            }else {
                throw new UnknowRoleException("Unknow role.");
            }
        }
    }

    public void deleteById(Long id) throws Exception {
        if (!repository.existsById(id)) {
            throw new Exception("brak skladnika z tym id ");
        }
        repository.deleteById(id);
    }

    public IngredientEntity findById(Long id) throws Exception {
        IngredientEntity model = repository
                .findById(id)
                .orElseThrow(() -> new Exception("brak skladnika z tym id "));
        return model;
    }
}
