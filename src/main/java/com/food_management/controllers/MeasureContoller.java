package com.food_management.controllers;

import com.food_management.entities.Measure;
import com.food_management.repositories.MeasureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/measures")
public class MeasureContoller {
    @Autowired
    MeasureRepository measureRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Measure> index() {
        return measureRepository.findAll();
    }

}
