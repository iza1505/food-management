package com.sobczyk.food_management.exceptions.configuration;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class ResponseEntityExceptionHandlerImpl extends ResponseEntityExceptionHandler {

    private static final String BAD_CREDENTIAL = "exception.invalidCredentials";
    private static final String ACCESS_DENIED = "exception.token";
    private static final String JWT = "exception.authRequired";

    @ExceptionHandler(FoodManagementException.class)
    public final ResponseEntity<ExceptionResponse> handleFoodManagementException(FoodManagementException e) {
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessageToShow());
        return new ResponseEntity<>(exceptionResponse, e.getHttpStatus());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public final ResponseEntity<ExceptionResponse> handleBadCredentialsException(BadCredentialsException e) {
        log.error(e.getMessage(),e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(BAD_CREDENTIAL);
        return new ResponseEntity<>(exceptionResponse,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public  final ResponseEntity<ExceptionResponse> handleAccessDeniedException(AccessDeniedException e){
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(ACCESS_DENIED);
        return new ResponseEntity<>(exceptionResponse,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JwtException.class)
    public  final ResponseEntity<ExceptionResponse> handleJwtException(JwtException e){
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(JWT);
        return new ResponseEntity<>(exceptionResponse,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleUnknownExceptions(Exception e) {
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse("exception.unknown");
        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}