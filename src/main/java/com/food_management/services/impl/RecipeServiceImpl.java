package com.food_management.services.impl;

import com.food_management.dtos.*;
import com.food_management.entities.*;
import com.food_management.repositories.RecipeRepository;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.IngredientService;
import com.food_management.services.interfaces.RecipeService;
import com.food_management.services.interfaces.UserService;
import lombok.Builder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RecipeServiceImpl extends BaseServiceImpl<RecipeRepository, RecipeEntity, RecipeDto> implements RecipeService {

    private UserService userService;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;
    private RecipeIngredientServiceImpl recipeIngredientService; //TODO: zmienic z impl na bez

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

//    @Override
//    public Boolean checkIfActive(Long id){
//        RecipeEntity recipeEntity = repository.getOne(id);
//        return recipeEntity.getActive();
//    }

    @Override
    public List<RecipeHeaderAdminDto> findAllNoActive(){
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderAdminDto> recipeHeaders = new ArrayList<>();
        for (RecipeEntity recipeEntity : recipeEntities){
            if(!recipeEntity.getActive() && !recipeEntity.getUser().getRole().getName().equals("ADMINISTRATOR")){
                recipeHeaders.add(new RecipeHeaderAdminDto());
               // recipeHeaders.get(recipeHeaders.size()-1).setActive(recipeEntity.getActive());
               // recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
                recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
                //recipeHeaders.get(recipeHeaders.size()-1).setUser(userService.convertToDto(recipeEntity.getUser()));
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

    public RecipeHeadersDto createHeaderDto(Integer elementsOnPage, Integer currentPage, List<? extends RecipeHeaderDto> recipeHeaders, String sortBy, Boolean ascendingSort ){
        RecipeHeadersDto recipeHeadersDto = new RecipeHeadersDto();
        if(recipeHeaders.size()>0){
            PagedListHolder<? extends RecipeHeaderDto> pageHolder;

            if(sortBy != null){
                if(ascendingSort != null){
                    pageHolder = new PagedListHolder<>(recipeHeaders, new MutableSortDefinition("title",true, ascendingSort));
                } else {
                    pageHolder = new PagedListHolder<>(recipeHeaders, new MutableSortDefinition(sortBy,true, true));
                }
                pageHolder.resort();
            }else {
                pageHolder = new PagedListHolder<>(recipeHeaders);
            }

            pageHolder.setPageSize(elementsOnPage);
            pageHolder.setPage(currentPage-1);
            Integer pageCount = pageHolder.getPageCount();

            List<? extends RecipeHeaderDto> recipeHeadersOnPage = pageHolder.getPageList();
            recipeHeadersDto.setRecipeHeaders(recipeHeadersOnPage);
            recipeHeadersDto.setPageCount(pageCount);
        }
        else {
            recipeHeadersDto.setRecipeHeaders(recipeHeaders);
            recipeHeadersDto.setPageCount(1);
        }

        return recipeHeadersDto;
    }

    @Override
    public RecipeHeadersDto findAllForAdmin(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderAdminDto> recipeHeaders = new ArrayList<>();

        for(RecipeEntity recipeEntity : recipeEntities){
            recipeHeaders.add(new RecipeHeaderAdminDto());
            recipeHeaders.get(recipeHeaders.size()-1).setActive(recipeEntity.getActive());
            recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
            recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
            recipeHeaders.get(recipeHeaders.size()-1).setUserLogin(recipeEntity.getUser().getLogin());
            recipeHeaders.get(recipeHeaders.size()-1).setVersion(recipeEntity.getVersion());
            recipeHeaders.get(recipeHeaders.size()-1).setWaitingForAccept(recipeEntity.getWaitingForAccept());
            recipeHeaders.get(recipeHeaders.size()-1).setToImprove(recipeEntity.getToImprove());

        }

        return createHeaderDto(elementsOnPage, currentPage, recipeHeaders, sortBy, ascendingSort);

    }

    @Override
    public RecipeHeadersDto findAllForUser(Integer possibleMissingIngredientsAmount, Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
        UserEntity userEntity = userSessionService.getUser();
        List<RecipeEntity> recipeEntities = findAllActive();
        List<RecipeHeaderUserDto> recipeHeaders = new ArrayList<>();
        Integer missingIngredientsAmount = 0;
        Integer maxPercentageToCook = 100;
        Integer percentageToCook = 0;


        for(RecipeEntity recipeEntity : recipeEntities){
                missingIngredientsAmount = 0;
                maxPercentageToCook = 100;
                for(RecipeIngredientEntity recipeIngredient : recipeEntity.getRecipeIngredients()){
                    if(missingIngredientsAmount<=possibleMissingIngredientsAmount || possibleMissingIngredientsAmount==-1){
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

                if(missingIngredientsAmount<=possibleMissingIngredientsAmount || possibleMissingIngredientsAmount==-1){
                    recipeHeaders.add(new RecipeHeaderUserDto());
                    recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
                    recipeHeaders.get(recipeHeaders.size()-1).setMissingIngredientsAmount(missingIngredientsAmount);
                    recipeHeaders.get(recipeHeaders.size()-1).setPercentageToCook(maxPercentageToCook);
                    recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
                    recipeHeaders.get(recipeHeaders.size()-1).setVersion(recipeEntity.getVersion());
                }

            }

        return createHeaderDto(elementsOnPage, currentPage, recipeHeaders, sortBy, ascendingSort);

    }

    @Override
    public RecipeHeadersDto findAllForAuthor(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort) {
        UserEntity userEntity = userSessionService.getUser();
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderForAuthorDto> recipeHeaders = new ArrayList<>();

        for(RecipeEntity recipeEntity : recipeEntities){
            if(recipeEntity.getUser().getId().equals(userEntity.getId())){
                recipeHeaders.add(new RecipeHeaderForAuthorDto());
                recipeHeaders.get(recipeHeaders.size()-1).setActive(recipeEntity.getActive());
                recipeHeaders.get(recipeHeaders.size()-1).setToImprove(recipeEntity.getToImprove());
                recipeHeaders.get(recipeHeaders.size()-1).setWaitingForAccept(recipeEntity.getWaitingForAccept());
                recipeHeaders.get(recipeHeaders.size()-1).setId(recipeEntity.getId());
                recipeHeaders.get(recipeHeaders.size()-1).setTitle(recipeEntity.getTitle());
                recipeHeaders.get(recipeHeaders.size()-1).setVersion(recipeEntity.getVersion());
            }
        }
        return createHeaderDto(elementsOnPage, currentPage, recipeHeaders, sortBy, ascendingSort);
    }

        @Override
    public RecipeDto updateStatus(Long id, RecipeChangeStatusDto dto) throws Exception {

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

            recipeEntity = repository.saveAndFlush(recipeEntity);

            return convertToDto(recipeEntity);
        }
    }

}
