package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private UserSessionService userSessionService;

    public UserController(
            @Lazy UserService service,
            UserSessionService userSessionService) {
        this.userService = service;
        this.userSessionService = userSessionService;
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @GetMapping
    ResponseEntity<HeadersDto> findAll(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                       @RequestParam(value = "currentPage") Integer currentPage,
                                       @RequestParam(value = "sortBy", required = false) String sortBy,
                                       @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","Konto niekatywne.");
        }

        return ResponseEntity.ok(userService.findAll(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
    @PutMapping
    ResponseEntity<ChangeActiveStatusDto> updateActiveStatus(@RequestBody ChangeActiveStatusDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","Konto niekatywne.");
        }

        return ResponseEntity.ok(userService.updateActiveStatus(dto));
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @PutMapping(value = "/myAccount")
    ResponseEntity<UserDetailsToChangeDto> updateDetails(@RequestBody UserDetailsToChangeDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","Konto niekatywne.");
        }

        return ResponseEntity.ok(userService.updateDetails(dto));
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @GetMapping(value = "/myAccount")
    ResponseEntity<MyDetailsUserDto> getMyDetails() {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","Konto niekatywne.");
        }

        return ResponseEntity.ok(userService.getMyDetails());
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @PutMapping(value = "/myAccount/changePassword")
    public ResponseEntity changePassword(@RequestBody ChangePasswordDto dto) {
        userService.changePassword(dto);
        return ResponseEntity.ok("Password has been changed.");
    }

//    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR')")
//    @DeleteMapping(value = "/deactivateAccount")
//    public ResponseEntity changeActiveStatus() {
//        userService.changeActiveStatus();
//        return ResponseEntity.ok("Account has been deactivated.");
//    }

}
