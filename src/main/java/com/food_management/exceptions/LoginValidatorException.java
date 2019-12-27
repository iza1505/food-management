package com.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class LoginValidatorException extends RuntimeException {

    public LoginValidatorException() {super();}

    public LoginValidatorException(String message){
        super(message);
    }

}
