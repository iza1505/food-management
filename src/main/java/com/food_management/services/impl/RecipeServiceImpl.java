package com.food_management.services.impl;

import com.food_management.dtos.RecipeDto;
import com.food_management.dtos.RecipeHeader;
import com.food_management.dtos.RecipeHeaderAdmin;
import com.food_management.entities.RecipeEntity;
import com.food_management.repositories.RecipeRepository;
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

    @Autowired
    public RecipeServiceImpl(RecipeRepository repository, ModelMapper modelMapper, UserService userService) {

        super(repository, modelMapper);

        this.userService = userService;
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
    public List<RecipeHeaderAdmin> findAllNoActive(){
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderAdmin> recipeHeaders = new ArrayList<>();
        for (RecipeEntity recipeEntity : recipeEntities){
            if(recipeEntity.getActive()){
                recipeHeaders.add(new RecipeHeaderAdmin());
                recipeHeaders.get(recipeHeaders.size()).setActive(recipeEntity.getActive());
                recipeHeaders.get(recipeHeaders.size()).setId(recipeEntity.getId());
                recipeHeaders.get(recipeHeaders.size()).setTitle(recipeEntity.getTitle());
                recipeHeaders.get(recipeHeaders.size()).setUser(userService.convertToDto(recipeEntity.getUser()));
                recipeHeaders.get(recipeHeaders.size()).setVersion(recipeEntity.getVersion());
                recipeHeaders.get(recipeHeaders.size()).setWaitingForAccept(recipeEntity.getWaitingForAccept());
            }
        }
        return recipeHeaders;
    }


}
