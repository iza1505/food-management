package com.sobczyk.food_management.exceptions.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class FMEntityNotFoundException extends FoodManagementException {

    public FMEntityNotFoundException(String message, String messageToShow) {
        super(message, messageToShow, HttpStatus.BAD_REQUEST);
    }
}
