package com.sobczyk.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EmptyFieldException extends RuntimeException {

    public EmptyFieldException() {
        super();
    }

    public EmptyFieldException(String message) {
        super(message);
    }
}