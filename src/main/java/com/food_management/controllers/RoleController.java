package com.food_management.controllers;

import com.food_management.dtos.RoleDto;
import com.food_management.entities.RoleEntity;
import com.food_management.exceptions.InactiveAccountException;
import com.food_management.security.UserSessionService;
import com.food_management.services.interfaces.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController extends BaseController<RoleEntity, RoleDto> {

    private UserSessionService userSessionService;

    public RoleController(RoleService service) {
        super(service);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<RoleDto>> findAll() {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return super.findAll();
    }


    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody RoleDto dto) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        RoleDto created = service.add(dto);
        return new ResponseEntity<RoleDto>(created, HttpStatus.CREATED);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ResponseEntity<RoleDto> getById(@PathVariable Long id) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return super.getById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return super.delete(id);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    ResponseEntity update(@PathVariable Long id, @Valid @RequestBody RoleDto dto) {
        if(!userSessionService.isActive()){
            throw new InactiveAccountException("Inactive account.");
        }

        return ResponseEntity.ok(service.update(dto));
    }
}