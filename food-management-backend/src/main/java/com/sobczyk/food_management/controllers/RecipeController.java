package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.exceptions.UnknowRoleException;
import com.sobczyk.food_management.security.UserSessionService;
import com.sobczyk.food_management.services.interfaces.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private RecipeService service;
    private UserSessionService userSessionService;

    public RecipeController(
            RecipeService service,
            UserSessionService userSessionService) {
        this.service = service;
        this.userSessionService = userSessionService;
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','USER','MANAGER')")
    @GetMapping(value = "/{id}")
    ResponseEntity<?> getById(@PathVariable Long id) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        String role = userSessionService.getUser().getRole().getName();
        if (role.equals("ADMINISTRATOR") || role.equals("MANAGER")) {
            return ResponseEntity.ok(service.getRecipeAdmin(id));
        } else if (role.equals("USER")) {
            return ResponseEntity.ok(service.getRecipeUser(id));
        } else {
            throw new UnknowRoleException("Unknow role.","exception.unknownRole");
        }

    }

    @PreAuthorize("hasAuthority('USER')") // zwraca wszystkie aktywne przepisy
    @GetMapping(value = "/all", params = {"possibleMissingIngredientsAmount", "elementsOnPage", "currentPage"})
    ResponseEntity<HeadersDto> findAllForUser(
            @RequestParam(value = "possibleMissingIngredientsAmount") Integer possibleMissingIngredientsAmount,
            @RequestParam(value = "elementsOnPage") Integer elementsOnPage,
            @RequestParam(value = "currentPage") Integer currentPage,
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "ascendingSort", required = false) Boolean ascendingSort) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }
        return ResponseEntity
                .ok(service.findAllForUser(possibleMissingIngredientsAmount, elementsOnPage, currentPage, sortBy,
                                           ascendingSort
                                          ));
    }

    @PreAuthorize("hasAnyAuthority('ADMINISTRATOR','MANAGER')") // zwraca wszystkie hedery przepisow jakie sa dla admina
    @GetMapping(value = "/all", params = {"elementsOnPage", "currentPage"})
    ResponseEntity<HeadersDto> findAllForAdmin(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                               @RequestParam(value = "currentPage") Integer currentPage,
                                               @RequestParam(value = "sortBy", required = false) String sortBy,
                                               @RequestParam(value = "ascendingSort", required = false)
                                                       Boolean ascendingSort) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        return ResponseEntity.ok(service.findAllForAdmin(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @PreAuthorize("hasAnyAuthority('USER','MANAGER')")
    @GetMapping(value = "/my")// zwraca hedery przepisow uzytkownika zalogowanego
    ResponseEntity<HeadersDto> findAllForAuthor(@RequestParam(value = "elementsOnPage") Integer elementsOnPage,
                                                @RequestParam(value = "currentPage") Integer currentPage,
                                                @RequestParam(value = "sortBy", required = false) String sortBy,
                                                @RequestParam(value = "ascendingSort", required = false)
                                                        Boolean ascendingSort) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        return ResponseEntity.ok(service.findAllForAuthor(elementsOnPage, currentPage, sortBy, ascendingSort));
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @PutMapping(value = "/{id}/updateStatus")
    ResponseEntity<RecipeDto> updateStatus(@PathVariable Long id,
                                           @RequestBody RecipeChangeStatusDto dto){
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        return ResponseEntity.ok(service.updateStatus(id, dto));
    }

    @PreAuthorize("hasAnyAuthority('USER','MANAGER')")
    @PutMapping(value = "/{id}") // upadte robi update dla wlasciciela
    ResponseEntity updateRecipe(@PathVariable Long id, @RequestBody RecipeUpdateDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }

        service.updateRecipe(id, dto);
        return ResponseEntity.ok("Recipe has been updated.");
    }

    @PreAuthorize("hasAnyAuthority('USER','MANAGER')")
    @PostMapping
    ResponseEntity add(@RequestBody RecipeDto dto) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }
        service.add(dto);
        return ResponseEntity.ok("Recipe has been added.");
    }

    @PreAuthorize("hasAnyAuthority('USER','MANAGER')")
    @DeleteMapping(value = "/{id}")
    ResponseEntity delete(@PathVariable Long id) {
        if (!userSessionService.isActive()) {
            throw new InactiveAccountException("Inactive account.","exception.inactiveAccount");
        }
        service.delete(id);
        return ResponseEntity.ok("Recipe has been deleted.");
    }

}
