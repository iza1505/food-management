package com.food_management.services.impl;

import com.food_management.dtos.RecipeChangeStatusDto;
import com.food_management.dtos.RecipeDto;
import com.food_management.dtos.RecipeHeaderAdminDto;
import com.food_management.dtos.RecipeHeaderUserDto;
import com.food_management.entities.*;
import com.food_management.repositories.RecipeRepository;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.IngredientService;
import com.food_management.services.interfaces.RecipeService;
import com.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RecipeServiceImpl extends BaseServiceImpl<RecipeRepository, RecipeEntity, RecipeDto> implements RecipeService {

    private UserService userService;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;

    @Autowired
    public RecipeServiceImpl(RecipeRepository repository, ModelMapper modelMapper, UserService userService, UserSessionService userSessionService, IngredientService ingredientService) {

        super(repository, modelMapper);

        this.userService = userService;
        this.userSessionService = userSessionService;
        this.ingredientService = ingredientService;
    }

    @Override
    public RecipeDto convertToDto(RecipeEntity entity) {
        return modelMapper.map(entity, RecipeDto.class);
    }

    @Override
    public RecipeEntity convertToEntity(RecipeDto dto) {
        return modelMapper.map(dto, RecipeEntity.class);
    }

    @Override
    public Boolean checkIfActive(Long id){
        RecipeEntity recipeEntity = repository.getOne(id);
        return recipeEntity.getActive();
        //TODO: logika sprawdzanai aktywnosci
        //return true;
    }

    @Override
    public List<RecipeHeaderAdminDto> findAllNoActive(){
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderAdminDto> recipeHeaders = new ArrayList<>();
        for (RecipeEntity recipeEntity : recipeEntities){
            if(!recipeEntity.getActive() && !recipeEntity.getUser().getRole().getName().equals("ADMINISTRATOR")){
                recipeHeaders.add(new RecipeHeaderAdminDto());
                recipeHeaders.get(recipeHeaders.size()-1).setActive(recipeEntity.getActive());
                recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
                recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
                recipeHeaders.get(recipeHeaders.size()-1).setUser(userService.convertToDto(recipeEntity.getUser()));
                recipeHeaders.get(recipeHeaders.size()-1).setVersion(recipeEntity.getVersion());
                recipeHeaders.get(recipeHeaders.size()-1).setWaitingForAccept(recipeEntity.getWaitingForAccept());
                recipeHeaders.get(recipeHeaders.size()-1).setToImprove(recipeEntity.getToImprove());
            }
        }
        return recipeHeaders;
    }

    @Override
    public List<RecipeEntity> findAllActive() {
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeEntity> activeRecipeEntities = new ArrayList<>();

        for (RecipeEntity recipeEntity : recipeEntities){
            if(recipeEntity.getActive()){
                activeRecipeEntities.add(recipeEntity);
            }
        }

        return activeRecipeEntities;
    }

    public Integer checkIfIngredientInFridgeAndReturnPercentageToCook(UserEntity userEntity, RecipeIngredientEntity recipeIngredientEntity){
        Integer percentageToCook = -1;
        for(UserIngredientEntity userIngredientEntity : userEntity.getUserIngredients()){
            if(userIngredientEntity.getUserIngredientKey().getIngredient().getId() == recipeIngredientEntity.getRecipeIngredientKey().getIngredient().getId()){
                percentageToCook = (int)((userIngredientEntity.getAmount()/recipeIngredientEntity.getAmount())*100);
                break;
            }
        }
        return percentageToCook;
    }

    @Override
    public List<RecipeHeaderUserDto> findAllForUser(Integer possibleMissingIngredientsAmount) {
        UserEntity userEntity = userSessionService.getUser();
        List<RecipeEntity> recipeEntities = findAllActive();
        List<RecipeHeaderUserDto> recipeHeaders = new ArrayList<>();
        Integer missingIngredientsAmount = 0;
        Integer maxPercentageToCook = 100; // domyslne, moze byc wiecej niz 100
        Integer percentageToCook = 0;

        if (possibleMissingIngredientsAmount<0){

            for(RecipeEntity recipeEntity : recipeEntities){
                recipeHeaders.add(new RecipeHeaderUserDto());
                recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
                recipeHeaders.get(recipeHeaders.size()-1).setMissingIngredientsAmount(missingIngredientsAmount);
                recipeHeaders.get(recipeHeaders.size()-1).setPercentageToCook(maxPercentageToCook);
                recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
                recipeHeaders.get(recipeHeaders.size()-1).setVersion(recipeEntity.getVersion());
            }
        }
        else {
            for(RecipeEntity recipeEntity : recipeEntities){
                missingIngredientsAmount = 0;
                maxPercentageToCook = 100;
                for(RecipeIngredientEntity recipeIngredient : recipeEntity.getRecipeIngredients()){
                    if(missingIngredientsAmount<=possibleMissingIngredientsAmount){
                        percentageToCook = checkIfIngredientInFridgeAndReturnPercentageToCook(userEntity, recipeIngredient);

                        if(percentageToCook>-1){
                            if(maxPercentageToCook>percentageToCook){
                                maxPercentageToCook=percentageToCook;
                            }
                        }
                        else {
                            missingIngredientsAmount++;
                        }
                    }
                    else {
                        break;
                    }
                }

                if(missingIngredientsAmount<=possibleMissingIngredientsAmount){
                    recipeHeaders.add(new RecipeHeaderUserDto());
                    recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
                    recipeHeaders.get(recipeHeaders.size()-1).setMissingIngredientsAmount(missingIngredientsAmount);
                    recipeHeaders.get(recipeHeaders.size()-1).setPercentageToCook(maxPercentageToCook);
                    recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
                    recipeHeaders.get(recipeHeaders.size()-1).setVersion(recipeEntity.getVersion());
                }

            }
        }

        return recipeHeaders;
    }

    @Override
    public void updateStatus(Long id, RecipeChangeStatusDto dto) throws Exception {

        if(dto.getActive() && dto.getWaitingForAccept()){
            throw new Exception("Nie mozna aktywnego i czekajacego");
        }
        else {
            RecipeEntity recipeEntity = repository.getOne(id);
            recipeEntity.setActive(dto.getActive());
            recipeEntity.setWaitingForAccept(dto.getWaitingForAccept());
            if(dto.getActive()){
                System.out.println("ustawiam pustke"); //TODO: usuac te dopiski
                recipeEntity.setToImprove("");
            } else {
                System.out.println("ustawiam opis " + dto.getToImprove());
                recipeEntity.setToImprove(dto.getToImprove());
            }

            repository.save(recipeEntity);
        }

    }

}
