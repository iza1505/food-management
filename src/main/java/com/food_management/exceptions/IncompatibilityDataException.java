package com.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class IncompatibilityDataException extends RuntimeException  {
    public IncompatibilityDataException() {super();}

    public IncompatibilityDataException(String message){
        super(message);
    }
}
