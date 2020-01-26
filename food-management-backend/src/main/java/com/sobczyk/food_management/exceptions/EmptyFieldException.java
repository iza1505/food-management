package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EmptyFieldException extends FoodManagementException {

//    public EmptyFieldException() {
//        super();
//    }

    public EmptyFieldException(String message, String messageToShow) {
        super(message,messageToShow,HttpStatus.BAD_REQUEST);
    }
}