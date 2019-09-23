package com.food_management.controllers;

import com.food_management.dtos.IngredientDto;
import com.food_management.entities.IngredientEntity;
import com.food_management.services.interfaces.IngredientService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController extends BaseController<IngredientEntity, IngredientDto> {

    private IngredientService ingredientService;

    public IngredientController(@Lazy IngredientService service) {
        super(service);
        this.ingredientService = service;
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<IngredientDto>> findAll() {
        return super.findAll();
    }


    @Override
    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody IngredientDto dto) {
        IngredientDto created = service.add(dto);
        return new ResponseEntity<IngredientDto>(created, HttpStatus.CREATED);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ResponseEntity<IngredientDto> getById(@PathVariable Long id) {
        return super.getById(id);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        return super.delete(id);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    ResponseEntity update(@PathVariable Long id, @Valid @RequestBody IngredientDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }
}
