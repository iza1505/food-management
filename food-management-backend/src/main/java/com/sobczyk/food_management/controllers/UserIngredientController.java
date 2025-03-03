package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.IngredientInFridgeAndRecipeDto;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.UserIngredientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/myIngredients")
public class UserIngredientController {

    private UserSessionService userSessionService;
    private UserIngredientService service;

    public UserIngredientController(UserSessionService userSessionService, UserIngredientService service) {
        this.userSessionService = userSessionService;
        this.service = service;
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping
    ResponseEntity<List<IngredientInFridgeAndRecipeDto>> findAll() {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccoutn");
        }

        List<IngredientInFridgeAndRecipeDto> dtoList = service.findAll();
        return ResponseEntity.ok(dtoList);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @PostMapping
    ResponseEntity add(@Valid @RequestBody IngredientInFridgeAndRecipeDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        IngredientInFridgeAndRecipeDto created = service.add(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @DeleteMapping(value = "/{id}")
    ResponseEntity delete(@PathVariable Long id) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @PutMapping
    ResponseEntity update(@Valid @RequestBody IngredientInFridgeAndRecipeDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        return ResponseEntity.ok(service.update(dto));
    }

}
