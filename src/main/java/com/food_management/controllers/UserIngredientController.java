package com.food_management.controllers;

import com.food_management.dtos.IngredientInFridgeDto;
import com.food_management.services.impl.UserIngredientServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    ResponseEntity<List<IngredientInFridgeDto>> findAll() {
        List<IngredientInFridgeDto> dtoList = service.findAll();
        return ResponseEntity.ok(dtoList);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody IngredientInFridgeDto dto) {
        IngredientInFridgeDto created = service.add(dto);
        return new ResponseEntity<IngredientInFridgeDto>(created, HttpStatus.CREATED);
    }
}
