package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.RoleDto;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    private UserSessionService userSessionService;
    private RoleService service;

    public RoleController(
            RoleService service,
            UserSessionService userSessionService) {
        this.service = service;
        this.userSessionService = userSessionService;
    }

    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @GetMapping
    ResponseEntity<List<RoleDto>> findAll() {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","Konto niekatywne.");
        }

        return ResponseEntity.ok(service.findAll());
    }

}