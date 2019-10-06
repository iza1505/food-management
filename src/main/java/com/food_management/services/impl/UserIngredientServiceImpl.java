package com.food_management.services.impl;

import com.food_management.dtos.IngredientInFridgeAndRecipeDto;
import com.food_management.dtos.UserIngredientDto;
import com.food_management.entities.UserIngredientEntity;
import com.food_management.entities.UserIngredientKey;
import com.food_management.entities.UserEntity;
import com.food_management.exceptions.EntityAlreadyExistsException;
import com.food_management.repositories.UserIngredientRepository;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.IngredientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserIngredientServiceImpl {

    protected UserIngredientRepository repository;
    private ModelMapper modelMapper;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;

    @Autowired
    public UserIngredientServiceImpl(UserIngredientRepository repository, ModelMapper modelMapper, UserSessionService userSessionService,IngredientService ingredientService
    ) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.userSessionService = userSessionService;
        this.ingredientService = ingredientService;
    }

    public UserIngredientDto convertToDto(UserIngredientEntity entity) {
        return modelMapper.map(entity, UserIngredientDto.class);
    }

    public UserIngredientEntity convertToEntity(UserIngredientDto dto) {
        return modelMapper.map(dto, UserIngredientEntity.class);
    }

    protected EntityNotFoundException entityNotFoundException(UserIngredientKey id, String name) {
        return new EntityNotFoundException(name + " with id user " + id.getUser().getId() + ", id ingredient " + id.getIngredient().getId() + "  not found.");
    }

    public List<IngredientInFridgeAndRecipeDto> findAll() {
        UserEntity userEntity = userSessionService.getUser();

        List<UserIngredientEntity> modelList = userEntity.getUserIngredients();
        List<IngredientInFridgeAndRecipeDto> ingredientsInFridge = new ArrayList<>();

        for (int i = 0; i < modelList.size(); i++){
            ingredientsInFridge.add(new IngredientInFridgeAndRecipeDto());
            ingredientsInFridge.get(i).setAmount(modelList.get(i).getAmount());
            ingredientsInFridge.get(i).setIngredient(convertToDto(modelList.get(i)).getIngredient());
            ingredientsInFridge.get(i).setVersion(modelList.get(i).getVersion());
        }

        return ingredientsInFridge;
    }

    public IngredientInFridgeAndRecipeDto update(IngredientInFridgeAndRecipeDto dto){
        int i = 0;
        UserEntity userEntity = userSessionService.getUser();

        for(UserIngredientEntity userIngredient : userEntity.getUserIngredients()) {
            if(userIngredient.getUserIngredientKey().getIngredient().getId() == dto.getIngredient().getId()){
                i++;
                UserIngredientEntity savedEntity = repository.getOne(userIngredient.getUserIngredientKey());
                savedEntity.setAmount(dto.getAmount());
                UserIngredientEntity newEntity = repository.saveAndFlush(savedEntity);
                dto.setIngredient(ingredientService.convertToDto(newEntity.getUserIngredientKey().getIngredient()));
                dto.setVersion(newEntity.getVersion());
                dto.setAmount(newEntity.getAmount());
                break;
            }
        }
        if(i == 0){
            throw new EntityAlreadyExistsException("Brak z id " + dto.getIngredient().getId() + " w lodowce"); }
            else
                return dto;
    }

    public void delete(Long id){
        int i = 0;
        UserEntity userEntity = userSessionService.getUser();

        for(UserIngredientEntity userIngredient : userEntity.getUserIngredients()) {
            if(userIngredient.getUserIngredientKey().getIngredient().getId() == id){
                i++;
                repository.deleteById(userIngredient.getUserIngredientKey());
                break;
            }
        }
        if(i == 0){
            throw new EntityAlreadyExistsException("Brak z id " + id); }
    }

    public IngredientInFridgeAndRecipeDto add(IngredientInFridgeAndRecipeDto dto){
        UserEntity userEntity = userSessionService.getUser();

        for(UserIngredientEntity userIngredient : userEntity.getUserIngredients()) {
            if(userIngredient.getUserIngredientKey().getIngredient().getId() == dto.getIngredient().getId()){
                throw new EntityAlreadyExistsException("Produkt juz w lodowce");
            }
        }

        UserIngredientEntity savedEntity = new UserIngredientEntity();

        savedEntity.setVersion(0L);
        savedEntity.setAmount(dto.getAmount());

        UserIngredientKey userIngredientKey = new UserIngredientKey();
        userIngredientKey.setIngredient(ingredientService.findById(dto.getIngredient().getId()));
        userIngredientKey.setUser(userEntity);
        savedEntity.setUserIngredientKey(userIngredientKey);

        UserIngredientEntity newEntity = repository.saveAndFlush(savedEntity);

        dto.setVersion(newEntity.getVersion());

        return dto;
    }

    public UserIngredientDto findById(UserIngredientKey id) {
        UserIngredientEntity model = repository
                .findById(id)
                .orElseThrow(() -> entityNotFoundException(id, "Entity"));
        return convertToDto(model);
    }

}
