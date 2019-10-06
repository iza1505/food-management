package com.food_management.services.impl;

import com.food_management.dtos.RecipeChangeStatusDto;
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
            if(!recipeEntity.getActive() && !recipeEntity.getUser().getRole().getName().equals("ADMINISTRATOR")){
                recipeHeaders.add(new RecipeHeaderAdmin());
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
