package com.food_management.services.impl;

import com.food_management.dtos.*;
import com.food_management.entities.*;
import com.food_management.repositories.RecipeRepository;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.IngredientService;
import com.food_management.services.interfaces.RecipeService;
import com.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
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

    @Override
    public RecipeDto getRecipeAdmin(Long id){
        RecipeEntity recipeEntity = repository.getOne(id);
        RecipeDto recipeDto = convertToDto(recipeEntity);
        return recipeDto;
    }

    @Override
    public RecipeGetUserDto getRecipeUser(Long id){
        UserEntity userEntity = userSessionService.getUser();
        RecipeEntity recipeEntity = repository.getOne(id);
        RecipeGetUserDto recipeDto = new RecipeGetUserDto();
        recipeDto.setDescription(recipeEntity.getDescription());
        recipeDto.setId(recipeEntity.getId());
        recipeDto.setPreparationMins(recipeEntity.getPreparationMins());
        recipeDto.setTitle(recipeEntity.getTitle());
        recipeDto.setUserName(recipeEntity.getUser().getLogin());
        recipeDto.setVersion(recipeEntity.getVersion());
        recipeDto.setIngredients(new ArrayList<>());
        for(int i = 0; i < recipeEntity.getRecipeIngredients().size(); i++){
            recipeDto.getIngredients().add(new IngredientAndPercentageDto());
            recipeDto.getIngredients().get(i).setIngredient(ingredientService.convertToDto(recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().getIngredient()));
            recipeDto.getIngredients().get(i).setPercentage(userService.getIngredientPercentage(recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().getIngredient().getId(),userEntity.getUserIngredients()).intValue());
        }

        return recipeDto;
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

    //@Override
    public RecipeUpdateDto createRecipeUpdateDto(RecipeEntity recipeEntity){
        RecipeUpdateDto recipeUpdateDto = new RecipeUpdateDto();

        recipeUpdateDto.setDescription(recipeEntity.getDescription());
        recipeUpdateDto.setId(recipeEntity.getId());
        recipeUpdateDto.setPreparationMins(recipeEntity.getPreparationMins());
        recipeUpdateDto.setTitle(recipeEntity.getTitle());
        recipeUpdateDto.setVersion(recipeEntity.getVersion());

        int i = 0;
        for(RecipeIngredientEntity ingredients : recipeEntity.getRecipeIngredients()){
            recipeUpdateDto.getIngredients().add(new IngredientInFridgeAndRecipeDto());
            recipeUpdateDto.getIngredients().get(i).setIngredient(ingredientService.convertToDto(ingredients.getRecipeIngredientKey().getIngredient()));
            recipeUpdateDto.getIngredients().get(i).setAmount(ingredients.getAmount());
            recipeUpdateDto.getIngredients().get(i).setVersion(ingredients.getVersion());
            i++;
        }

        return recipeUpdateDto;
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
    public RecipeUpdateDto updateRecipe(Long id, RecipeUpdateDto recipeUpdateDto) throws Exception {
        if(id != recipeUpdateDto.getId()){
            throw new Exception("Id innego przepisu w update recipe");
        }
        RecipeEntity recipeEntity = repository.getOne(id);

        UserEntity userEntity = userSessionService.getUser();
        if(recipeEntity.getUser().getId() != userEntity.getId()){
            throw new Exception("Id innego usera niz autora w update recipe");
        }

        recipeEntity.setToImprove("");
        recipeEntity.setWaitingForAccept(true);
        recipeEntity.setActive(false);

        recipeEntity.setDescription(recipeUpdateDto.getDescription());
        recipeEntity.setPreparationMins(recipeUpdateDto.getPreparationMins());
        recipeEntity.setTitle(recipeUpdateDto.getTitle());
        recipeEntity.getRecipeIngredients().clear();
        int i = 0;
        for (IngredientInFridgeAndRecipeDto ingredient : recipeUpdateDto.getIngredients()){
            recipeEntity.getRecipeIngredients().add(new RecipeIngredientEntity());
            recipeEntity.getRecipeIngredients().get(i).setAmount(recipeUpdateDto.getIngredients().get(i).getAmount());
            recipeEntity.getRecipeIngredients().get(i).setVersion(recipeUpdateDto.getIngredients().get(i).getVersion());
            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setIngredient(ingredientService.convertToEntity(recipeUpdateDto.getIngredients().get(i).getIngredient()));
            i++;
        }

        RecipeEntity updatedRecipeEntity = repository.saveAndFlush(recipeEntity);

        return createRecipeUpdateDto(updatedRecipeEntity);

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
            throw new Exception("Nie mozna aktywnego i czekajacego"); //TODO: exception do update status
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
