package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.MeasureDto;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.MeasureService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/measures")
public class MeasureController {

    private UserSessionService userSessionService;
    private MeasureService service;

    public MeasureController(MeasureService service, UserSessionService userSessionService) {
        this.service = service;
        this.userSessionService = userSessionService;
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @GetMapping
    ResponseEntity<List<MeasureDto>> findAll() {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.");
        }
        return ResponseEntity.ok(service.findAll());
    }

}
