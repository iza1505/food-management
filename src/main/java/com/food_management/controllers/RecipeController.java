package com.food_management.controllers;

import com.food_management.dtos.*;
import com.food_management.entities.RecipeEntity;
import com.food_management.services.interfaces.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController extends BaseController<RecipeEntity, RecipeDto> {

    private RecipeService service;

    public RecipeController(RecipeService service) {

        super(service);
        this.service = service;
    }

    // recipes bez niczego i zrobic get i dla admina wszystkie a dla uzytkownika tylko jego i aktywne
//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(value = "/all",method = RequestMethod.GET) //  default: all active recipes
//    ResponseEntity<List<RecipeHeaderUserDto>> findAllHeaders() {
//        service.findAllHeaders();
//    }
    @PreAuthorize("hasAuthority('USER')")
    @RequestMapping(value = "/all",method = RequestMethod.GET, params = {"possibleMissingIngredientsAmount", "elementsOnPage", "currentPage"})
    ResponseEntity<RecipeHeadersDto> findAllForUser(@RequestParam(value = "possibleMissingIngredientsAmount") Integer possibleMissingIngredientsAmount,
                                                    @RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                    @RequestParam(value = "currentPage") Integer currentPage,
                                                    @RequestParam(value = "sortBy", required = false) String sortBy,
                                                    @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        return ResponseEntity.ok(service.findAllForUser(possibleMissingIngredientsAmount, elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/all",method = RequestMethod.GET, params = {"elementsOnPage", "currentPage"})
    ResponseEntity<RecipeHeadersDto> findAllForAdmin(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                     @RequestParam(value = "currentPage") Integer currentPage,
                                                     @RequestParam(value = "sortBy", required = false) String sortBy,
                                                     @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        return ResponseEntity.ok(service.findAllForAdmin(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @RequestMapping(value = "/my",method = RequestMethod.GET)
    ResponseEntity<RecipeHeadersDto> findAllForAuthor(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                     @RequestParam(value = "currentPage") Integer currentPage,
                                                     @RequestParam(value = "sortBy", required = false) String sortBy,
                                                     @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        return ResponseEntity.ok(service.findAllForAuthor(elementsOnPage, currentPage, sortBy, ascendingSort));
    }


//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(value = "/NoActive",method = RequestMethod.GET)
//    ResponseEntity<List<RecipeHeaderAdminDto>> findAllNoActive() {
//        //recipeService.findAllNoActive()
//       // return service.findAllNoActive();
//        return ResponseEntity.ok(service.findAllNoActive());
//    }
//
//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(value = "/NoActive/{id}",method = RequestMethod.GET)
//    ResponseEntity<RecipeDto> findNoActive(@PathVariable Long id) throws Exception {
//        if(service.checkIfActive(id)){
//            throw new Exception("Aktywny przepis");
//        }
//            return ResponseEntity.ok(service.convertToDto(service.findById(id)));
//    }

    //TODO: zrobic tez z /{id}/updateRecipe dla poprawek dla wlasciciela przepisu
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}/updateStatus",method = RequestMethod.PUT)
    ResponseEntity<RecipeDto> updateStatus(@PathVariable Long id, @RequestBody RecipeChangeStatusDto dto) throws Exception {
//        if(service.checkIfActive(id)){
//            throw new Exception("Aktywny przepis");
//        }
        //service.updateStatus(id, dto);
        return ResponseEntity.ok(service.updateStatus(id, dto));
    }

    @RequestMapping(value = "/{id}/updateRecipe",method = RequestMethod.PUT)
    ResponseEntity<RecipeDto> updateRecipe(@PathVariable Long id, @RequestBody RecipeUpdateDto dto) {

        //service.updateRecipe(id, dto); //TODO: zrobic update recipe dla wlasciciela
        return ResponseEntity.ok(service.convertToDto(service.findById(id)));
    }

}
