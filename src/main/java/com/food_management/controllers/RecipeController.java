package com.food_management.controllers;

import com.food_management.dtos.RecipeDto;
import com.food_management.dtos.RecipeHeader;
import com.food_management.dtos.RecipeHeaderAdmin;
import com.food_management.entities.RecipeEntity;
import com.food_management.services.interfaces.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController extends BaseController<RecipeEntity, RecipeDto> {

    private RecipeService service;

    public RecipeController(RecipeService service) {

        super(service);
        this.service = service;
    }

//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(value = "/all",method = RequestMethod.GET) //  default: all active recipes
//    ResponseEntity<List<RecipeHeader>> findAllHeaders() {
//        service.findAllHeaders();
//    }


    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/allNoActive",method = RequestMethod.GET)
    ResponseEntity<List<RecipeHeaderAdmin>> findAllNoActive() {
        //recipeService.findAllNoActive()
       // return service.findAllNoActive();
        return ResponseEntity.ok(service.findAllNoActive());
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/allNoActive/{id}",method = RequestMethod.GET)
    ResponseEntity<RecipeDto> findNoActive(@PathVariable Long id) throws Exception {
        if(service.checkIfActive(id)){
            throw new Exception("Aktywny przepis");
        }
            return ResponseEntity.ok(service.convertToDto(service.findById(id)));
    }

}
