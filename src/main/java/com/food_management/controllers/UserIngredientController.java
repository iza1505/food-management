package com.food_management.controllers;

import com.food_management.dtos.IngredientInFridgeAndRecipeDto;
import com.food_management.exceptions.InactiveAccountException;
import com.food_management.security.UserSessionService;
import com.food_management.services.impl.UserIngredientServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/myIngredients")
@Transactional
public class UserIngredientController {

    private UserSessionService userSessionService;
    private UserIngredientServiceImpl service; //TODO: usunac impl

    public UserIngredientController(UserSessionService userSessionService, UserIngredientServiceImpl service) {
        this.userSessionService = userSessionService;
        this.service = service;
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<IngredientInFridgeAndRecipeDto>> findAll() {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        List<IngredientInFridgeAndRecipeDto> dtoList = service.findAll();
        return ResponseEntity.ok(dtoList);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody IngredientInFridgeAndRecipeDto dto) throws Exception {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        IngredientInFridgeAndRecipeDto created = service.add(dto);
        return new ResponseEntity<IngredientInFridgeAndRecipeDto>(created, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity update(@Valid @RequestBody IngredientInFridgeAndRecipeDto dto) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return ResponseEntity.ok(service.update(dto));
    }

}
