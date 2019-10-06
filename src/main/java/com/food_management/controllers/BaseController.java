package com.food_management.controllers;

import com.food_management.services.interfaces.BaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.List;

public class BaseController<TModel, UDto> {

    protected BaseService<TModel, UDto> service;

    public BaseController(BaseService<TModel, UDto> service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<UDto>> findAll() {
        List<UDto> dtoList = service.findAll();
        return ResponseEntity.ok(dtoList);
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody UDto dto) {
        UDto created = service.add(dto);
        return new ResponseEntity<UDto>(created, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ResponseEntity<UDto> getById(@PathVariable Long id) {
        UDto result = service.convertToDto(service.findById(id));
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    ResponseEntity update(@PathVariable Long id, @Valid @RequestBody UDto dto) {
        service.update(dto);
        return ResponseEntity.ok(service.convertToDto(service.findById(id)));
    }
}