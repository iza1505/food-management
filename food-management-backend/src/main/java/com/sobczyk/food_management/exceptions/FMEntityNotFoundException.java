package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class FMEntityNotFoundException extends FoodManagementException {

    public FMEntityNotFoundException(String message, String messageToShow) {
        super(message, messageToShow, HttpStatus.BAD_REQUEST);
    }
}
