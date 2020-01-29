package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.HeadersDto;
import com.sobczyk.food_management.dtos.IngredientDto;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.impl.IngredientServiceImpl;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    private IngredientServiceImpl service;
    private UserSessionService userSessionService;

    public IngredientController(
            @Lazy IngredientServiceImpl service,
            UserSessionService userSessionService) {
        this.service = service;
        this.userSessionService = userSessionService;
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER','MANAGER')")
    @GetMapping(value = "/all")
    ResponseEntity<List<IngredientDto>> getAllActive() {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        return ResponseEntity.ok(service.getAll());
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','MANAGER')")
    @GetMapping
    ResponseEntity<HeadersDto> findAll(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                       @RequestParam(value = "currentPage") Integer currentPage,
                                       @RequestParam(value = "sortBy", required = false) String sortBy,
                                       @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        return ResponseEntity.ok(service.findAll(elementsOnPage, currentPage, sortBy, ascendingSort));
    }


    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER','MANAGER')")
    @PostMapping
    ResponseEntity add(@RequestBody IngredientDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }
        IngredientDto created = service.add(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('MANAGER')")
    @DeleteMapping(value = "/{id}")
    ResponseEntity delete(@PathVariable Long id) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }
        service.deleteById(id);
        return ResponseEntity.ok("Ingredient has been deleted.");
    }


    @PreAuthorize("hasAnyAuthority('MANAGER')")
    @PutMapping
    ResponseEntity update(@Valid @RequestBody IngredientDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }
        return ResponseEntity.ok(service.update(dto));
    }
}
