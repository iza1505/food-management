package com.food_management.controllers;

import com.food_management.dtos.IngredientInFridgeAndRecipeDto;
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

    private UserIngredientServiceImpl service;

    public UserIngredientController(UserIngredientServiceImpl service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<IngredientInFridgeAndRecipeDto>> findAll() {
        List<IngredientInFridgeAndRecipeDto> dtoList = service.findAll();
        return ResponseEntity.ok(dtoList);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody IngredientInFridgeAndRecipeDto dto) {
        IngredientInFridgeAndRecipeDto created = service.add(dto);
        return new ResponseEntity<IngredientInFridgeAndRecipeDto>(created, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity update(@Valid @RequestBody IngredientInFridgeAndRecipeDto dto) {
        return ResponseEntity.ok(service.update(dto));
    }

}
