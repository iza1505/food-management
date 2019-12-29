package com.sobczyk.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UnknowRoleException extends RuntimeException {
    public UnknowRoleException() {super();}

    public UnknowRoleException(String message){
        super(message);
    }
}
