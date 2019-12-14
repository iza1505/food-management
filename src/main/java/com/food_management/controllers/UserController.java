package com.food_management.controllers;

import com.food_management.dtos.*;
import com.food_management.exceptions.InactiveAccountException;
import com.food_management.security.UserSessionService;
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
    private UserSessionService userSessionService;

    public UserController(@Lazy UserService service) {
        this.userService = service;
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<HeadersDto> findAll(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                       @RequestParam(value = "currentPage") Integer currentPage,
                                       @RequestParam(value = "sortBy", required = false) String sortBy,
                                       @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return ResponseEntity.ok(userService.findAll(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

//    @RequestMapping(method = RequestMethod.POST)
//    ResponseEntity add(@Valid @RequestBody UserDto dto) {
//        UserDto created = userService.add(dto);
//        return new ResponseEntity<UserDto>(created, HttpStatus.CREATED);
//    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(value = "/myAccount", method = RequestMethod.PUT)
    ResponseEntity<UserDetailsToChangeDto> updateDetails(@RequestBody UserDetailsToChangeDto dto) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return ResponseEntity.ok(userService.updateDetails(dto));
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(value = "/myAccount", method = RequestMethod.GET)
    ResponseEntity<MyDetailsUserDto> getMyDetails() {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return ResponseEntity.ok(userService.getMyDetails());
    }

}
