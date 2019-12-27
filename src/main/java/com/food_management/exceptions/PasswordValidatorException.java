package com.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class PasswordValidatorException extends RuntimeException {

    public PasswordValidatorException() {super();}

    public PasswordValidatorException(String message){
        super(message);
    }
}
