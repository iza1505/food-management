package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED)
public class BadVersionException extends FoodManagementException {

//    public BadVersionException() {
//        super();
//    }

    public BadVersionException(String message) {
        super(message,HttpStatus.PRECONDITION_FAILED);
    }
}
