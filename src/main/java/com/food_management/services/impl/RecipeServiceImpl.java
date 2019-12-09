package com.food_management.services.impl;

import com.food_management.dtos.*;
import com.food_management.entities.*;
import com.food_management.repositories.RecipeIngredientRepository;
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
//extends BaseServiceImpl<RecipeRepository, RecipeEntity, RecipeDto>
@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private UserService userService;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;
    private ModelMapper modelMapper;
    private RecipeRepository repository;
    private RecipeIngredientRepository recipeIngredientRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository repository, RecipeIngredientRepository recipeIngredientRepository, ModelMapper modelMapper, UserService userService, UserSessionService userSessionService, IngredientService ingredientService) {

        this.repository = repository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.userSessionService = userSessionService;
        this.ingredientService = ingredientService;
        this.recipeIngredientRepository = recipeIngredientRepository;
    }

    //@Override
    public RecipeDto convertToDto(RecipeEntity entity) {
        return modelMapper.map(entity, RecipeDto.class);
    }

    //@Override
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
            recipeDto.getIngredients().add(new IngredientAndPossessedAmountDto());
            recipeDto.getIngredients().get(i).setIngredient(ingredientService.convertToDto(recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().getIngredient()));
            recipeDto.getIngredients().get(i).setHasGot(userService.getIngredientPercentage(recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().getIngredient().getId(),userEntity.getUserIngredients()).intValue());
            recipeDto.getIngredients().get(i).setAmount(recipeEntity.getRecipeIngredients().get(i).getAmount());
            recipeDto.getIngredients().get(i).setVersion(recipeEntity.getRecipeIngredients().get(i).getVersion());
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
        recipeUpdateDto.setIngredients(new ArrayList<>());
        recipeUpdateDto.setUserName(recipeEntity.getUser().getLogin());

        int i = 0;
        for(RecipeIngredientEntity ingredient : recipeEntity.getRecipeIngredients()){
            recipeUpdateDto.getIngredients().add(new IngredientInFridgeAndRecipeDto());
            System.out.println("ing " + ingredient.getRecipeIngredientKey().getIngredient());
            System.out.println("ingconv " + ingredientService.convertToDto(ingredient.getRecipeIngredientKey().getIngredient()));
           // recipeUpdateDto.getIngredients().get(i).setIngredient(ingredientService.convertToDto(ingredients.getRecipeIngredientKey().getIngredient()));
            recipeUpdateDto.getIngredients().get(i).setAmount(ingredient.getAmount());
            recipeUpdateDto.getIngredients().get(i).setVersion(ingredient.getVersion());
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
    public void updateRecipe(Long id, RecipeUpdateDto recipeUpdateDto) throws Exception { //TODO: zeby nie zwracal przepisu bo i tak przeniesie na str recipes/my
        if(id != recipeUpdateDto.getId()){
            throw new Exception("Id innego przepisu w update recipe");
        }

        RecipeEntity recipeEntity = repository.getOne(id);

        UserEntity userEntity = userSessionService.getUser();

        if(recipeEntity.getUser().getId() != userEntity.getId()){
            throw new Exception("Id innego usera niz autora w update recipe");
        }

        if(userEntity.getRole().getName().equals("USER")){
            recipeEntity.setWaitingForAccept(true);
            recipeEntity.setActive(false);
        }
        else {
            recipeEntity.setWaitingForAccept(false);
            recipeEntity.setActive(true);
        }


        recipeEntity.setDescription(recipeUpdateDto.getDescription());
        recipeEntity.setPreparationMins(recipeUpdateDto.getPreparationMins());
        recipeEntity.setTitle(recipeUpdateDto.getTitle());
        recipeEntity.setUser(userEntity);

        recipeEntity = addIngredientToRecipeEntity(recipeEntity,id,recipeUpdateDto.getIngredients());
//        int i = 0;
//        for (IngredientInFridgeAndRecipeDto ingredient : recipeUpdateDto.getIngredients()){
//            recipeEntity.getRecipeIngredients().add(new RecipeIngredientEntity());
//            recipeEntity.getRecipeIngredients().get(i).setAmount(ingredient.getAmount());
//            recipeEntity.getRecipeIngredients().get(i).setVersion(ingredient.getVersion());
//            recipeEntity.getRecipeIngredients().get(i).setRecipeIngredientKey(new RecipeIngredientKey());
//            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setIngredient(ingredientService.findById(ingredient.getIngredient().getId()));
//            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setRecipe(repository.getOne(id));
//            recipeIngredientRepository.save(recipeEntity.getRecipeIngredients().get(i));
//           i++;
//        }
        repository.save(recipeEntity);
        //return createRecipeUpdateDto(updatedRecipeEntity);
    }

    public RecipeEntity addIngredientToRecipeEntity(RecipeEntity recipeEntity, Long id, List<IngredientInFridgeAndRecipeDto> ingredients) throws Exception {
        int i = 0;
        for (IngredientInFridgeAndRecipeDto ingredient : ingredients){
            recipeEntity.getRecipeIngredients().add(new RecipeIngredientEntity());
            recipeEntity.getRecipeIngredients().get(i).setAmount(ingredient.getAmount());
            recipeEntity.getRecipeIngredients().get(i).setVersion(ingredient.getVersion());
            recipeEntity.getRecipeIngredients().get(i).setRecipeIngredientKey(new RecipeIngredientKey());
            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setIngredient(ingredientService.findById(ingredient.getIngredient().getId()));
            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setRecipe(repository.getOne(id));
            recipeIngredientRepository.save(recipeEntity.getRecipeIngredients().get(i));
            i++;
        }

        return recipeEntity;
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
    public void add(RecipeDto dto) throws Exception {
        if(repository.existsByTitle(dto.getTitle())){
            throw new Exception("Istnieje przepis o takim tytule");
        }

        RecipeEntity recipeEntity = convertToEntity(dto);

        UserEntity userEntity = userSessionService.getUser();

        if(userEntity.getRole().getName().equals("USER")){
            recipeEntity.setWaitingForAccept(true);
            recipeEntity.setActive(false);
            recipeEntity.setToImprove("");
        }
        else {

            recipeEntity.setWaitingForAccept(false);
            recipeEntity.setActive(true);
            recipeEntity.setToImprove("");
        }

        recipeEntity.setUser(userService.findById(userEntity.getId()));
        recipeEntity.getRecipeIngredients().clear();
        recipeEntity = repository.saveAndFlush(recipeEntity);

        Long id = recipeEntity.getId();

        recipeEntity = addIngredientToRecipeEntity(recipeEntity,id,dto.getIngredients());
//        int i = 0;
//        for (IngredientInFridgeAndRecipeDto ingredient : dto.getIngredients()){
//            recipeEntity.getRecipeIngredients().add(new RecipeIngredientEntity());
//            recipeEntity.getRecipeIngredients().get(i).setAmount(ingredient.getAmount());
//            recipeEntity.getRecipeIngredients().get(i).setVersion(ingredient.getVersion());
//            recipeEntity.getRecipeIngredients().get(i).setRecipeIngredientKey(new RecipeIngredientKey());
//            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setIngredient(ingredientService.findById(ingredient.getIngredient().getId()));
//            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().setRecipe(repository.getOne(id));
//            recipeIngredientRepository.save(recipeEntity.getRecipeIngredients().get(i));
//            i++;
//        }

       repository.save(recipeEntity);

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
                recipeEntity.setToImprove("");
            } else {
                recipeEntity.setToImprove(dto.getToImprove());
            }

            recipeEntity = repository.saveAndFlush(recipeEntity);

            return convertToDto(recipeEntity);
        }
    }

}
