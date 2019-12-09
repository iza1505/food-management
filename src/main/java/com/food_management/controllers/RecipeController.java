package com.food_management.controllers;

import com.food_management.dtos.*;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
//    public class RecipeController extends BaseController<RecipeEntity, RecipeDto> {

    private RecipeService service;
    private UserSessionService userSessionService;

    public RecipeController(RecipeService service, UserSessionService userSessionService) {
        this.service = service;
        this.userSessionService = userSessionService;
    }

    //@Override
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    ResponseEntity<?> getById(@PathVariable Long id) throws Exception {
        String role = userSessionService.getUser().getRole().getName();
        if(role.equals("ADMINISTRATOR")){
            return ResponseEntity.ok(service.getRecipeAdmin(id));
        }
        else if(role.equals("USER")){
            return ResponseEntity.ok(service.getRecipeUser(id));
        }
        else {
            throw new Exception("nieznana rola");
        }

    }

    @PreAuthorize("hasAuthority('USER')") // zwraca wszystkie aktywne przepisy
    @RequestMapping(value = "/all",method = RequestMethod.GET, params = {"possibleMissingIngredientsAmount", "elementsOnPage", "currentPage"})
    ResponseEntity<RecipeHeadersDto> findAllForUser(@RequestParam(value = "possibleMissingIngredientsAmount") Integer possibleMissingIngredientsAmount,
                                                    @RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                    @RequestParam(value = "currentPage") Integer currentPage,
                                                    @RequestParam(value = "sortBy", required = false) String sortBy,
                                                    @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        return ResponseEntity.ok(service.findAllForUser(possibleMissingIngredientsAmount, elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')") // zwraca wszystkie hedery przepisow jakie sa dla admina
    @RequestMapping(value = "/all",method = RequestMethod.GET, params = {"elementsOnPage", "currentPage"})
    ResponseEntity<RecipeHeadersDto> findAllForAdmin(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                     @RequestParam(value = "currentPage") Integer currentPage,
                                                     @RequestParam(value = "sortBy", required = false) String sortBy,
                                                     @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        return ResponseEntity.ok(service.findAllForAdmin(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @RequestMapping(value = "/my",method = RequestMethod.GET) // zwraca hedery przepisow uzytkownika zalogowanego
    ResponseEntity<RecipeHeadersDto> findAllForAuthor(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                     @RequestParam(value = "currentPage") Integer currentPage,
                                                     @RequestParam(value = "sortBy", required = false) String sortBy,
                                                     @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        return ResponseEntity.ok(service.findAllForAuthor(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}/updateStatus",method = RequestMethod.PUT)
    ResponseEntity<RecipeDto> updateStatus(@PathVariable Long id, @RequestBody RecipeChangeStatusDto dto) throws Exception {
        return ResponseEntity.ok(service.updateStatus(id, dto));
    }

    @RequestMapping(value = "/{id}/updateRecipe",method = RequestMethod.PUT) // upadte robi update dla wlasciciela
    ResponseEntity updateRecipe(@PathVariable Long id, @RequestBody RecipeUpdateDto dto) throws Exception {
        service.updateRecipe(id,dto);
        return ResponseEntity.ok().build(); //TODO: zwrot info ze update wykonany
    }

    //@Override
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@RequestBody RecipeDto dto) throws Exception {
        System.out.println(dto);
        service.add(dto);
        return ResponseEntity.ok().build(); //TODO: zwrot info ze update wykonany
        //return new ResponseEntity<UserDto>(created, HttpStatus.CREATED);
    }

}
