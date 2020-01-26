package com.sobczyk.food_management.exceptions;

import com.sobczyk.food_management.exceptions.configuration.FoodManagementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class LoginValidatorException extends FoodManagementException {

    //public LoginValidatorException() {super();}

    public LoginValidatorException(String message, String messageToShow) {
        super(message,messageToShow,HttpStatus.BAD_REQUEST);
    }

}
