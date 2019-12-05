package com.food_management.controllers;

import com.food_management.dtos.IngredientDto;
import com.food_management.entities.IngredientEntity;
import com.food_management.services.impl.IngredientServiceImpl;
import com.food_management.services.interfaces.IngredientService;
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

    public IngredientController(IngredientServiceImpl service) {
        //super(service);
        this.service = service;
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<IngredientDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }


    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody IngredientDto dto) throws Exception {
        IngredientDto created = service.add(dto);
        return new ResponseEntity<IngredientDto>(created, HttpStatus.CREATED);
    }

//    @Override
//    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
//    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
//    ResponseEntity<IngredientDto> getById(@PathVariable Long id) {
//        return super.getById(id);
//    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.DELETE, params = {"id"})
    ResponseEntity delete(@RequestParam(value = "id") Long id) throws Exception {
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity update(@Valid @RequestBody IngredientDto dto) {
        return ResponseEntity.ok(service.update(dto));
    }
}
