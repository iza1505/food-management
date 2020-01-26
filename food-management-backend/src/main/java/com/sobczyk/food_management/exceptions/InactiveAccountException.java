package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InactiveAccountException extends FoodManagementException {
//    public InactiveAccountException() {super();}

    public InactiveAccountException(String message, String messageToShow) {
        super(message,messageToShow,HttpStatus.UNAUTHORIZED);
    }
}
