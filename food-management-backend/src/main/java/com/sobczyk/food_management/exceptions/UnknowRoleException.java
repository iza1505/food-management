package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UnknowRoleException extends FoodManagementException {

    public UnknowRoleException(String message, String messageToShow) {
        super(message,messageToShow,HttpStatus.UNAUTHORIZED);
    }
}
