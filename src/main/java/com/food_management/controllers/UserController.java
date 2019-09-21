package com.food_management.controllers;

import com.food_management.dtos.UserDto;
import com.food_management.entities.UserEntity;
import com.food_management.services.interfaces.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController extends BaseController<UserEntity, UserDto> {

    private UserService userService;

    public UserController(@Lazy UserService service) {
        super(service);
        this.userService = service;
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<UserDto>> findAll() {
        return super.findAll();
    }


    @Override
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody UserDto dto) {
        UserDto created = service.add(dto);
        return new ResponseEntity<UserDto>(created, HttpStatus.CREATED);
    }

    @Override
    //@PreAuthorize("hasAuthority('" + Constants.ADMINISTRATOR + "')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ResponseEntity<UserDto> getById(@PathVariable Long id) {
        return super.getById(id);
    }

    @Override
    //@PreAuthorize("hasAuthority('" + Constants.ADMINISTRATOR + "')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        return super.delete(id);
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    ResponseEntity update(@PathVariable Long id, @Valid @RequestBody UserDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

}
