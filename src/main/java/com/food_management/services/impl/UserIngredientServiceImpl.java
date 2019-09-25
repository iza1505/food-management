package com.food_management.services.impl;

import com.food_management.dtos.IngredientInFridgeDto;
import com.food_management.dtos.UserIngredientDto;
import com.food_management.entities.UserIngredientEntity;
import com.food_management.entities.UserIngredientKey;
import com.food_management.entities.UserEntity;
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
    protected ModelMapper modelMapper;
    protected UserSessionService userSessionService;
    protected IngredientServiceImpl ingredientService;

    @Autowired
    public UserIngredientServiceImpl(IngredientServiceImpl ingredientService, UserIngredientRepository repository, ModelMapper modelMapper, UserSessionService userSessionService) {
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
        return new EntityNotFoundException(name + " with id user " + id.getUserId() + ", id ingredient " + id.getIngredientId() + "  not found.");
    }

    public List<IngredientInFridgeDto> findAll() {
        UserEntity userEntity = userSessionService.getUser();

        List<UserIngredientEntity> modelList = userEntity.getUserIngredients();
        List<IngredientInFridgeDto> ingredientsInFridge = new ArrayList<>();

        for (int i = 0; i < modelList.size(); i++){
            ingredientsInFridge.add(new IngredientInFridgeDto());
            ingredientsInFridge.get(i).setAmount(modelList.get(i).getAmount());
            ingredientsInFridge.get(i).setIngredient(convertToDto(modelList.get(i)).getIngredient());
            ingredientsInFridge.get(i).setVersion(modelList.get(i).getVersion());
        }

        return ingredientsInFridge;
    }

    public IngredientInFridgeDto add(IngredientInFridgeDto dto){
        UserEntity userEntity = userSessionService.getUser();
        UserIngredientEntity savedEntity = new UserIngredientEntity();
        savedEntity.setVersion(0L);
        savedEntity.setAmount(dto.getAmount());

        UserIngredientKey userIngredientKey = new UserIngredientKey();
        userIngredientKey.setIngredientId(dto.getIngredient().getId());
        userIngredientKey.setUserId(userEntity.getId());

        savedEntity.setUser(userEntity);
        savedEntity.setIngredient(ingredientService.findByIdEntity(dto.getIngredient().getId()));

        savedEntity.setUserIngredientKey(userIngredientKey);

        UserIngredientEntity userIngredientEntityNew = repository.saveAndFlush(savedEntity);

        IngredientInFridgeDto ingredientInFridgeDtoNew = new IngredientInFridgeDto();
        ingredientInFridgeDtoNew.setVersion(userIngredientEntityNew.getVersion());
        ingredientInFridgeDtoNew.setAmount(userIngredientEntityNew.getAmount());
        ingredientInFridgeDtoNew.setIngredient(ingredientService.convertToDto(userIngredientEntityNew.getIngredient()));

        return ingredientInFridgeDtoNew;
    }


    public void deleteById(UserIngredientKey id){
        if (!repository.existsById(id)) {
            throw entityNotFoundException(id,"Entity");
        }
        repository.deleteById(id);
    }

    public UserIngredientDto findById(UserIngredientKey id) {
        UserIngredientEntity model = repository
                .findById(id)
                .orElseThrow(() -> entityNotFoundException(id, "Entity"));
        return convertToDto(model);
    }

}
