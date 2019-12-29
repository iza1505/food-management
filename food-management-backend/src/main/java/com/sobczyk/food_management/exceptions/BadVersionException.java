package com.sobczyk.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED)
public class BadVersionException extends RuntimeException {

    public BadVersionException() {
        super();
    }

    public BadVersionException(String message) {
        super(message);
    }
}
