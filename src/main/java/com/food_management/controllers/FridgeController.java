package com.food_management.controllers;

import com.food_management.dtos.FridgeDto;
import com.food_management.dtos.IngredientDto;
import com.food_management.entities.FridgeEntity;
import com.food_management.services.impl.FridgeServiceImpl;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users/myFridge")
public class FridgeController  {

    private FridgeServiceImpl service;

    public FridgeController(@Lazy FridgeServiceImpl service) {
        this.service = service;
    }

    //@PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<FridgeDto>> findAll() {
        List<FridgeDto> dtoList = service.findAll();
        return ResponseEntity.ok(dtoList);
    }
}
