package com.sobczyk.food_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ConfirmedAccountException extends RuntimeException{

    public ConfirmedAccountException(){
        super();
    }

    public ConfirmedAccountException(String message){
        super(message);
    }

}
