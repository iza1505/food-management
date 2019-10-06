package com.food_management.controllers;

import com.food_management.dtos.MeasureDto;
import com.food_management.entities.MeasureEntity;
import com.food_management.services.interfaces.MeasureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/measures")
public class MeasureContoller extends BaseController<MeasureEntity, MeasureDto> {

    public MeasureContoller(MeasureService service) {
        super(service);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<MeasureDto>> findAll() {
        return super.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity add(@Valid @RequestBody MeasureDto dto) {
        MeasureDto created = service.add(dto);
        return new ResponseEntity<MeasureDto>(created, HttpStatus.CREATED);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    ResponseEntity delete(@PathVariable Long id) {
        return super.delete(id);
    }

    @Override
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    ResponseEntity update(@PathVariable Long id, @Valid @RequestBody MeasureDto dto) {
        return ResponseEntity.ok(service.update(dto));
    }

}
