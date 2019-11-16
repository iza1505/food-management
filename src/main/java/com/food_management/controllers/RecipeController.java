package com.food_management.controllers;

import com.food_management.dtos.RecipeChangeStatusDto;
import com.food_management.dtos.RecipeDto;
import com.food_management.dtos.RecipeHeaderAdminDto;
import com.food_management.dtos.RecipeHeaderUserDto;
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
    @RequestMapping(value = "/all",method = RequestMethod.GET)
    ResponseEntity<List<RecipeHeaderUserDto>> findAllForUser() {
        Integer dop = 5;
        return ResponseEntity.ok(service.findAllForUser(dop));
    }


    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/NoActive",method = RequestMethod.GET)
    ResponseEntity<List<RecipeHeaderAdminDto>> findAllNoActive() {
        //recipeService.findAllNoActive()
       // return service.findAllNoActive();
        return ResponseEntity.ok(service.findAllNoActive());
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/NoActive/{id}",method = RequestMethod.GET)
    ResponseEntity<RecipeDto> findNoActive(@PathVariable Long id) throws Exception {
        if(service.checkIfActive(id)){
            throw new Exception("Aktywny przepis");
        }
            return ResponseEntity.ok(service.convertToDto(service.findById(id)));
    }

    //TODO: zrobic tez z /{id}/updateRecipe dla poprawek dla wlasciciela przepisu
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}/updateStatus",method = RequestMethod.PUT)
    ResponseEntity<RecipeDto> updateStatus(@PathVariable Long id, @RequestBody RecipeChangeStatusDto dto) throws Exception {
        if(service.checkIfActive(id)){
            throw new Exception("Aktywny przepis");
        }
        service.updateStatus(id, dto);
        return ResponseEntity.ok(service.convertToDto(service.findById(id)));
    }

}
