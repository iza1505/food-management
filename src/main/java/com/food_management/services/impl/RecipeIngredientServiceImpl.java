package com.food_management.services.impl;

import com.food_management.dtos.RecipeIngredientDto;
import com.food_management.entities.RecipeIngredientEntity;
import com.food_management.repositories.RecipeIngredientRepository;
import com.food_management.repositories.UserIngredientRepository;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.IngredientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RecipeIngredientServiceImpl {

    protected RecipeIngredientRepository repository;
    private ModelMapper modelMapper;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;

    @Autowired
    public RecipeIngredientServiceImpl(RecipeIngredientRepository repository, ModelMapper modelMapper, UserSessionService userSessionService,IngredientService ingredientService
    ) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.userSessionService = userSessionService;
        this.ingredientService = ingredientService;
    }

    public RecipeIngredientDto convertToDto(RecipeIngredientEntity entity) {
        return modelMapper.map(entity, RecipeIngredientDto.class);
    }

    public RecipeIngredientEntity convertToEntity(RecipeIngredientDto dto) {
        return modelMapper.map(dto, RecipeIngredientEntity.class);
    }
}
