package com.food_management.controllers;

import com.food_management.dtos.MeasureDto;
import com.food_management.entities.MeasureEntity;
import com.food_management.exceptions.InactiveAccountException;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.MeasureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/measures")
public class MeasureContoller {

    private UserSessionService userSessionService;
    private MeasureService service;

    public MeasureContoller(MeasureService service, UserSessionService userSessionService) {
        this.service = service;
        this.userSessionService = userSessionService;
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<MeasureDto>> findAll() {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return ResponseEntity.ok(service.findAll());
    }

//    @Override
//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(method = RequestMethod.POST)
//    ResponseEntity add(@Valid @RequestBody MeasureDto dto) {
//        if(!userSessionService.isActive()){
//            throw new InactiveAccountException("Inactive account.");
//        }
//
//        MeasureDto created = service.add(dto);
//        return new ResponseEntity<MeasureDto>(created, HttpStatus.CREATED);
//    }
//
//    @Override
//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
//    ResponseEntity delete(@PathVariable Long id) {
//        if(!userSessionService.isActive()){
//            throw new InactiveAccountException("Inactive account.");
//        }
//
//        return super.delete(id);
//    }
//
//    @Override
//    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
//    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
//    ResponseEntity update(@PathVariable Long id, @Valid @RequestBody MeasureDto dto) {
//        if(!userSessionService.isActive()){
//            throw new InactiveAccountException("Inactive account.");
//        }
//
//        return ResponseEntity.ok(service.update(dto));
//    }

}
