package com.food_management.controllers;

import com.food_management.dtos.MyDetailsUserDto;
import com.food_management.dtos.UserDetailsToChangeDto;
import com.food_management.dtos.UserDto;
import com.food_management.dtos.UsersDetailsDto;
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
public class UserController {

    private UserService userService;

    public UserController(@Lazy UserService service) {
        this.userService = service;
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<UsersDetailsDto>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody UserDto dto) {
        UserDto created = userService.add(dto);
        return new ResponseEntity<UserDto>(created, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(value = "/myAccount", method = RequestMethod.PUT)
    ResponseEntity<UserDetailsToChangeDto> updateDetails(@RequestBody UserDetailsToChangeDto dto) {
        return ResponseEntity.ok(userService.updateDetails(dto));
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(value = "/myAccount", method = RequestMethod.GET)
    ResponseEntity<MyDetailsUserDto> getMyDetails() {
        return ResponseEntity.ok(userService.getMyDetails());
    }

}
