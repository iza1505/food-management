package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.IngredientInFridgeAndRecipeDto;
import com.sobczyk.food_management.dtos.UserIngredientDto;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import com.sobczyk.food_management.entities.UserIngredientKey;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.exceptions.EmptyFieldException;
import com.sobczyk.food_management.exceptions.EntityAlreadyExistsException;
import com.sobczyk.food_management.exceptions.FMEntityNotFoundException;
import com.sobczyk.food_management.repositories.UserIngredientRepository;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.IngredientService;
import com.sobczyk.food_management.services.interfaces.UserIngredientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserIngredientServiceImpl implements UserIngredientService {

    protected UserIngredientRepository repository;
    private ModelMapper modelMapper;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;

    @Autowired
    public UserIngredientServiceImpl(UserIngredientRepository repository, ModelMapper modelMapper,
                                     UserSessionService userSessionService, IngredientService ingredientService
                                    ) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.userSessionService = userSessionService;
        this.ingredientService = ingredientService;

    }

    @Override
    public UserIngredientDto convertToDto(UserIngredientEntity entity) {
        return modelMapper.map(entity, UserIngredientDto.class);
    }

    @Override
    public UserIngredientEntity convertToEntity(UserIngredientDto dto) {
        return modelMapper.map(dto, UserIngredientEntity.class);
    }

    @Override
    public List<IngredientInFridgeAndRecipeDto> findAll() {
        UserEntity userEntity = userSessionService.getUser();

        List<UserIngredientEntity> modelList = userEntity.getUserIngredients();
        List<IngredientInFridgeAndRecipeDto> ingredientsInFridge = new ArrayList<>();

        for (int i = 0; i < modelList.size(); i++) {
            ingredientsInFridge.add(new IngredientInFridgeAndRecipeDto(
                    convertToDto(modelList.get(i)).getIngredient(),
                    modelList.get(i).getAmount(),
                    modelList.get(i).getVersion()
            ));
        }

        return ingredientsInFridge;
    }

    @Override
    public IngredientInFridgeAndRecipeDto update(IngredientInFridgeAndRecipeDto dto) {
        int i = 0;
        UserEntity userEntity = userSessionService.getUser();
        IngredientInFridgeAndRecipeDto updatedDto = new IngredientInFridgeAndRecipeDto();

        for (UserIngredientEntity userIngredient : userEntity.getUserIngredients()) {
            if (userIngredient.getUserIngredientKey().getIngredient().getId() == dto.getIngredient().getId()) {
                i++;
                UserIngredientEntity savedEntity = findById(userIngredient.getUserIngredientKey());
                Validator.validateVersionUserIngredientEntity(savedEntity, dto.getVersion());
                savedEntity.setAmount(dto.getAmount());
                UserIngredientEntity newEntity = repository.saveAndFlush(savedEntity);
                updatedDto.setIngredient(
                        ingredientService.convertToDto(newEntity.getUserIngredientKey().getIngredient()));
                updatedDto.setVersion(newEntity.getVersion());
                updatedDto.setAmount(newEntity.getAmount());
            }
        }

        if (i == 0) {
            throw new EntityAlreadyExistsException(
                    "Ingredient with id " + dto.getIngredient().getId() + " not exists in fridge.", "exception.productNotFoundInFridge");
        } else
            return updatedDto;
    }

    @Override
    public void delete(Long id) {
        int i = 0;
        UserEntity userEntity = userSessionService.getUser();

        for (UserIngredientEntity userIngredient : userEntity.getUserIngredients()) {
            if (userIngredient.getUserIngredientKey().getIngredient().getId() == id) {
                i++;
                repository.deleteById(userIngredient.getUserIngredientKey());
                break;
            }
        }
        if (i == 0) {
            throw new EntityAlreadyExistsException("Ingredient with id " + id + " not exists.", "exception.productNotExists");
        }
    }

    @Override
    public IngredientInFridgeAndRecipeDto add(IngredientInFridgeAndRecipeDto dto) {
        UserEntity userEntity = userSessionService.getUser();


        if (dto.getIngredient()==null) {
            throw new EmptyFieldException(
                    "Empty ingredient.", "exception.emptyProduct");
        }

        if (dto.getAmount()==null) {
            throw new EmptyFieldException(
                    "Empty amount for ingredient in fridge.", "exception.amountGreater0");
        }

        for (UserIngredientEntity userIngredient : userEntity.getUserIngredients()) {
            if (userIngredient.getUserIngredientKey().getIngredient().getId() == dto.getIngredient().getId()) {
                throw new EntityAlreadyExistsException("Ingredient exists in fridge.", "exception.productAlreadyInFridge");
            }
        }



        UserIngredientKey userIngredientKey =
                new UserIngredientKey(userEntity, ingredientService.findById(dto.getIngredient().getId()));

        UserIngredientEntity savedEntity = new UserIngredientEntity(userIngredientKey, dto.getAmount(), 0L);
        savedEntity.setUserIngredientKey(userIngredientKey);

        UserIngredientEntity newEntity = repository.saveAndFlush(savedEntity);

        return new IngredientInFridgeAndRecipeDto(
                ingredientService.convertToDto(newEntity.getUserIngredientKey().getIngredient()), newEntity.getAmount(),
                newEntity.getVersion()
        );
    }

    @Override
    public UserIngredientEntity findById(UserIngredientKey id) {
        return repository.findById(id).orElseThrow(() -> new FMEntityNotFoundException(
                "Entity with id user " + id.getUser().getId() + ", id ingredient " + id.getIngredient().getId() +
                        "  not found.","exception.productNotFoundInFridge"));
    }

}
