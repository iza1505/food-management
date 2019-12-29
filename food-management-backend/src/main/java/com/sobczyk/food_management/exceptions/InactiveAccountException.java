package com.sobczyk.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InactiveAccountException extends RuntimeException {
    public InactiveAccountException() {super();}

    public InactiveAccountException(String message){
        super(message);
    }
}
