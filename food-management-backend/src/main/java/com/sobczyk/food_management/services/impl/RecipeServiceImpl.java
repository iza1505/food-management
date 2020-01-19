package com.sobczyk.food_management.services.impl;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.entities.*;
import com.sobczyk.food_management.exceptions.EntityAlreadyExistsException;
import com.sobczyk.food_management.exceptions.IncompatibilityDataException;
import com.sobczyk.food_management.repositories.RecipeIngredientRepository;
import com.sobczyk.food_management.repositories.RecipeRepository;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.IngredientService;
import com.sobczyk.food_management.services.interfaces.RecipeService;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    private UserService userService;
    private UserSessionService userSessionService;
    private IngredientService ingredientService;
    private ModelMapper modelMapper;
    private RecipeRepository repository;
    private RecipeIngredientRepository recipeIngredientRepository;
    private HeadersPaginationImpl headersPagination;

    @Autowired
    public RecipeServiceImpl(
            RecipeRepository repository,
            RecipeIngredientRepository recipeIngredientRepository,
            ModelMapper modelMapper,
            @Lazy UserService userService,
            UserSessionService userSessionService,
            IngredientService ingredientService,
            HeadersPaginationImpl headersPagination) {

        this.repository = repository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.userSessionService = userSessionService;
        this.ingredientService = ingredientService;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.headersPagination = headersPagination;
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

        for (RecipeEntity recipeEntity : recipeEntities) {
            if (recipeEntity.getActive()) {
                activeRecipeEntities.add(recipeEntity);
            }
        }

        return activeRecipeEntities;
    }

    @Override
    public RecipeDto getRecipeAdmin(Long id) {
        return convertToDto(repository.getOne(id));
    }

    @Override
    public RecipeGetUserDto getRecipeUser(Long id) {
        UserEntity userEntity = userSessionService.getUser();
        RecipeEntity recipeEntity = repository.getOne(id);
        RecipeGetUserDto recipeDto =
                new RecipeGetUserDto(recipeEntity.getId(), recipeEntity.getVersion(), recipeEntity.getTitle(),
                                     recipeEntity.getPreparationMins(), recipeEntity.getDescription(),
                                     recipeEntity.getUser().getLogin(), new ArrayList<>()
                );

        for (int i = 0; i < recipeEntity.getRecipeIngredients().size(); i++) {
            recipeDto.getIngredients().add(new IngredientAndPossessedAmountDto(
                    ingredientService.convertToDto(
                            recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().getIngredient()),
                    recipeEntity.getRecipeIngredients().get(i).getAmount(), userService.getIngredientPercentage(
                    recipeEntity.getRecipeIngredients().get(i).getRecipeIngredientKey().getIngredient().getId(),
                    userEntity.getUserIngredients()
                                                                                                               ),
                    recipeEntity.getRecipeIngredients().get(i).getVersion()
            ));

        }

        return recipeDto;
    }

    @Override
    public Integer checkIfIngredientInFridgeAndReturnPercentageToCook(UserEntity userEntity,
                                                                      RecipeIngredientEntity recipeIngredientEntity) {
        Integer percentageToCook = -1;
        for (UserIngredientEntity userIngredientEntity : userEntity.getUserIngredients()) {
            if (userIngredientEntity.getUserIngredientKey().getIngredient().getId() ==
                    recipeIngredientEntity.getRecipeIngredientKey().getIngredient().getId()) {
                percentageToCook =
                        (int) ((userIngredientEntity.getAmount() / recipeIngredientEntity.getAmount()) * 100);
                break;
            }
        }
        return percentageToCook;
    }

    @Override
    public HeadersDto findAllForAdmin(Integer elementsOnPage, Integer currentPage, String sortBy,
                                      Boolean ascendingSort) {
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderAdminDto> recipeHeaders = new ArrayList<>();

        for (RecipeEntity recipeEntity : recipeEntities) {
            recipeHeaders.add(new RecipeHeaderAdminDto(recipeEntity.getId(), recipeEntity.getVersion(),
                                                       recipeEntity.getTitle(), recipeEntity.getUser().getLogin(),
                                                       recipeEntity.getActive(), recipeEntity.getWaitingForAccept(),
                                                       recipeEntity.getToImprove()
            ));
        }
        return headersPagination.createHeaderDto(elementsOnPage, currentPage, recipeHeaders, sortBy, ascendingSort);
    }

    @Override
    public HeadersDto findAllForUser(Integer possibleMissingIngredientsAmount, Integer elementsOnPage,
                                     Integer currentPage, String sortBy, Boolean ascendingSort) {
        UserEntity userEntity = userSessionService.getUser();
        List<RecipeEntity> recipeEntities = findAllActive();
        List<RecipeHeaderUserDto> recipeHeaders = new ArrayList<>();
        Integer missingIngredientsAmount;
        Integer maxPercentageToCook;
        Integer percentageToCook = 0;
        Integer ingredientsAmountInRecipe = 0;

        for (RecipeEntity recipeEntity : recipeEntities) {
            missingIngredientsAmount = 0;
            maxPercentageToCook = 100;
            ingredientsAmountInRecipe=recipeEntity.getRecipeIngredients().size();
            recipeEntity.getTitle();
            for (RecipeIngredientEntity recipeIngredient : recipeEntity.getRecipeIngredients()) {
                if (missingIngredientsAmount <= possibleMissingIngredientsAmount ||
                        possibleMissingIngredientsAmount == -1) {
                    percentageToCook = checkIfIngredientInFridgeAndReturnPercentageToCook(userEntity, recipeIngredient);

                    if (percentageToCook > -1) {
                        if (maxPercentageToCook > percentageToCook) {
                            maxPercentageToCook = percentageToCook;
                        }
                    } else {
                        missingIngredientsAmount++;
                    }
                } else {
                    break;
                }
            }
            if(ingredientsAmountInRecipe==missingIngredientsAmount){
                maxPercentageToCook=0;
            }

            if (missingIngredientsAmount <= possibleMissingIngredientsAmount ||
                    possibleMissingIngredientsAmount == -1) {
                recipeHeaders.add(new RecipeHeaderUserDto(recipeEntity.getId(), recipeEntity.getVersion(),
                                                          recipeEntity.getTitle(), missingIngredientsAmount,
                                                          maxPercentageToCook
                ));
            }

        }

        return headersPagination.createHeaderDto(elementsOnPage, currentPage, recipeHeaders, sortBy, ascendingSort);
    }

    @Override
    public void updateRecipe(Long id, RecipeUpdateDto recipeUpdateDto) {
        if (!id.equals(recipeUpdateDto.getId())) {
            throw new IncompatibilityDataException("Incompatible recipe data.");
        }

        RecipeEntity recipeEntity = repository.getOne(id);

        Validator.validateVersion(recipeEntity, recipeUpdateDto.getVersion());

        UserEntity userEntity = userSessionService.getUser();
        if (!recipeEntity.getUser().getId().equals(userEntity.getId())) {
            throw new IncompatibilityDataException("Incompatible data: id recipe's author is different with your.");
        }

        if (userEntity.getRole().getName().equals("USER")) {
            recipeEntity.setWaitingForAccept(true);
            recipeEntity.setActive(false);
        } else {
            recipeEntity.setWaitingForAccept(false);
            recipeEntity.setActive(true);
        }

        recipeEntity.setDescription(recipeUpdateDto.getDescription());
        recipeEntity.setPreparationMins(recipeUpdateDto.getPreparationMins());
        recipeEntity.setTitle(recipeUpdateDto.getTitle());
        recipeEntity.setUser(userEntity);

        recipeIngredientRepository.deleteAllByRecipeIngredientKey_RecipeId(recipeEntity.getId());
        recipeEntity = repository.saveAndFlush(recipeEntity);
        recipeEntity = addIngredientToRecipeEntity(recipeEntity, id, recipeUpdateDto.getIngredients());

        repository.save(recipeEntity);
    }

    @Override
    public RecipeEntity addIngredientToRecipeEntity(RecipeEntity recipeEntity, Long id,
                                                    List<IngredientInFridgeAndRecipeDto> ingredients) {
        int i = 0;
        for (IngredientInFridgeAndRecipeDto ingredient : ingredients) {
            recipeEntity.getRecipeIngredients().add(new RecipeIngredientEntity(
                    new RecipeIngredientKey(repository.getOne(id),
                                            ingredientService.findById(ingredient.getIngredient().getId())
                    ), ingredient.getAmount(), ingredient.getVersion()));
            recipeIngredientRepository.save(recipeEntity.getRecipeIngredients().get(i));
            i++;
        }

        return recipeEntity;
    }

    @Override
    public HeadersDto findAllForAuthor(Integer elementsOnPage, Integer currentPage, String sortBy,
                                       Boolean ascendingSort) {
        UserEntity userEntity = userSessionService.getUser();
        List<RecipeEntity> recipeEntities = repository.findAll();
        List<RecipeHeaderForAuthorDto> recipeHeaders = new ArrayList<>();

        for (RecipeEntity recipeEntity : recipeEntities) {
            if (recipeEntity.getUser().getId().equals(userEntity.getId())) {
                recipeHeaders.add(new RecipeHeaderForAuthorDto(userEntity.getId(), recipeEntity.getVersion(),
                                                               recipeEntity.getTitle(), recipeEntity.getActive(),
                                                               recipeEntity.getWaitingForAccept(),
                                                               recipeEntity.getToImprove()
                ));
            }
        }

        return headersPagination.createHeaderDto(elementsOnPage, currentPage, recipeHeaders, sortBy, ascendingSort);
    }

    @Override
    public void add(RecipeDto dto) {
        if (repository.existsByTitle(dto.getTitle())) {
            throw new EntityAlreadyExistsException("Recipe with title  " + dto.getTitle() + " already exists.");
        }

        RecipeEntity recipeEntity = convertToEntity(dto);

        UserEntity userEntity = userSessionService.getUser();

        if (userEntity.getRole().getName().equals("USER")) {
            recipeEntity.setWaitingForAccept(true);
            recipeEntity.setActive(false);
            recipeEntity.setToImprove("");
        } else {

            recipeEntity.setWaitingForAccept(false);
            recipeEntity.setActive(true);
            recipeEntity.setToImprove("");
        }

        recipeEntity.setUser(userService.findById(userEntity.getId()));
        recipeEntity.getRecipeIngredients().clear();
        recipeEntity = repository.saveAndFlush(recipeEntity);

        Long id = recipeEntity.getId();

        recipeEntity = addIngredientToRecipeEntity(recipeEntity, id, dto.getIngredients());

        repository.save(recipeEntity);

    }

    @Override
    public RecipeDto updateStatus(Long id, RecipeChangeStatusDto dto) {
        RecipeEntity recipeEntity = repository.getOne(id);
        Validator.validateVersion(recipeEntity, dto.getVersion());

        if (dto.getActive() && dto.getWaitingForAccept()) {
            throw new IncompatibilityDataException("Can't set active and waiting recipe.");
        } else {

            recipeEntity.setActive(dto.getActive());
            recipeEntity.setWaitingForAccept(dto.getWaitingForAccept());
            if (dto.getActive()) {
                recipeEntity.setToImprove("");
            } else {
                recipeEntity.setToImprove(dto.getToImprove());
            }

            recipeEntity = repository.saveAndFlush(recipeEntity);

            return convertToDto(recipeEntity);
        }
    }

    @Override
    public void delete(Long id) {
        RecipeEntity recipeEntity = repository.getOne(id);
        if (recipeEntity != null) {
            repository.deleteById(id);
        }
    }
}
