package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class EntityAlreadyExistsException extends FoodManagementException {

    public EntityAlreadyExistsException(String message, String messageToShow) {
        super(message,messageToShow,HttpStatus.BAD_REQUEST);
    }
}

