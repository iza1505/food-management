package com.sobczyk.food_management.exceptions.configuration;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class FoodManagementException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String messageToShow;

    public FoodManagementException(String message, String messageToShow,  HttpStatus httpStatus) {
        super(message);
        this.messageToShow = messageToShow;
        this.httpStatus = httpStatus;
    }

}
