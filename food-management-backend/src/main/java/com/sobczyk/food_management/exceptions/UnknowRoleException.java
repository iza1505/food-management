package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UnknowRoleException extends FoodManagementException {
    //public UnknowRoleException() {super();}

    public UnknowRoleException(String message, String messageToShow) {
        super(message,messageToShow,HttpStatus.UNAUTHORIZED);
    }
}
