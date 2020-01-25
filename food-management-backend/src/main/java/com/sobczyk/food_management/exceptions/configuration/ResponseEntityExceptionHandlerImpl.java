package com.sobczyk.food_management.exceptions.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class ResponseEntityExceptionHandlerImpl extends ResponseEntityExceptionHandler {

//    private static final String OPTIMISTIC_LOCK_CODE = "exception.optimisticLock.outdatedVersion";
//    private static final HttpStatus OPTIMISTIC_LOCK_STATUS = HttpStatus.PRECONDITION_FAILED;
//
//    private static final String INTEGRITY_VIOLATION_CODE = "exception.integrityViolation";
//    private static final HttpStatus INTEGRITY_VIOLATION_STATUS = HttpStatus.BAD_REQUEST;
//
//    private static final String ACCESS_DENIED_CODE = "exception.accessDenied";
//    private static final HttpStatus ACCESS_DENIED_STATUS = HttpStatus.FORBIDDEN;
//
//    private static final String METHOD_ARGUMENT_TYPE_MISMATCH_CODE = "exception.typeMismatch";
//    private static final HttpStatus METHOD_ARGUMENT_TYPE_MISMATCH_STATUS = HttpStatus.BAD_REQUEST;
//
//    private static final String HTTP_NOT_READABLE_ERROR_CODE = "exception.httpNotReadable";
//    private static final HttpStatus HTTP_NOT_READABLE_ERROR_STATUS = HttpStatus.BAD_REQUEST;
//
//    private static final String HTTP_NOT_SUPPORTED_ERROR_CODE = "exception.httpMethodNotSupported";
//    private static final HttpStatus HTTP_NOT_SUPPORTED_ERROR_STATUS = HttpStatus.METHOD_NOT_ALLOWED;

    //private static final String VALIDATION_ERROR_CODE = "exception.validation";
    private static final HttpStatus VALIDATION_ERROR_STATUS = HttpStatus.BAD_REQUEST;

    //private static final String UNKNOWN_ERROR_CODE = "exception.unknown";
    private static final HttpStatus UNKNOWN_ERROR_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;


    @ExceptionHandler(FoodManagementException.class)
    public final ResponseEntity<ExceptionResponse> handleApplicationException(FoodManagementException e,
                                                                          WebRequest request) {
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage());
        return new ResponseEntity<>(exceptionResponse, e.getHttpStatus());
    }

//    @ExceptionHandler(OptimisticLockingFailureException.class)
//    public final ResponseEntity<ErrorResponse> handleOptimisticLockingFailureException(
//            DataIntegrityViolationException e, WebRequest request) {
//        log.error(e.getMessage(), e);
//        ErrorResponse errorResponse = new ErrorResponse(OPTIMISTIC_LOCK_CODE);
//        return new ResponseEntity<>(errorResponse, OPTIMISTIC_LOCK_STATUS);
//    }
//
//    @ExceptionHandler(DataIntegrityViolationException.class)
//    public final ResponseEntity<ErrorResponse> handleDIVException(DataIntegrityViolationException e,
//                                                                  WebRequest request) {
//        log.error(e.getMessage(), e);
//        ErrorResponse errorResponse = new ErrorResponse(INTEGRITY_VIOLATION_CODE);
//        return new ResponseEntity<>(errorResponse, INTEGRITY_VIOLATION_STATUS);
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    public final ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException e,
//                                                                           WebRequest request) {
//        log.error(e.getMessage(), e);
//        ErrorResponse errorResponse = new ErrorResponse(ACCESS_DENIED_CODE);
//        return new ResponseEntity<>(errorResponse, ACCESS_DENIED_STATUS);
//    }
//
//    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
//    public final ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException
//            (MethodArgumentTypeMismatchException e, WebRequest request) {
//        log.error(e.getMessage(), e);
//        ErrorResponse errorResponse = new ErrorResponse(METHOD_ARGUMENT_TYPE_MISMATCH_CODE);
//        return new ResponseEntity<>(errorResponse, METHOD_ARGUMENT_TYPE_MISMATCH_STATUS);
//    }
//
//    @Override
//    @SuppressWarnings("NullableProblems")
//    public final ResponseEntity<Object> handleHttpMessageNotReadable(
//            HttpMessageNotReadableException e, HttpHeaders headers, HttpStatus status,
//            WebRequest request) {
//        log.error(e.getMessage(), e);
//        ErrorResponse errorResponse = new ErrorResponse(HTTP_NOT_READABLE_ERROR_CODE);
//        return new ResponseEntity<>(errorResponse, HTTP_NOT_READABLE_ERROR_STATUS);
//    }
//
//    @Override
//    @SuppressWarnings("NullableProblems")
//    public final ResponseEntity<Object> handleHttpRequestMethodNotSupported(
//            HttpRequestMethodNotSupportedException e, HttpHeaders headers, HttpStatus status,
//            WebRequest request) {
//        log.error(e.getMessage(), e);
//        ErrorResponse errorResponse = new ErrorResponse(HTTP_NOT_SUPPORTED_ERROR_CODE);
//        return new ResponseEntity<>(errorResponse, HTTP_NOT_SUPPORTED_ERROR_STATUS);
//    }

    @Override
    @SuppressWarnings("NullableProblems")
    public final ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e, HttpHeaders headers, HttpStatus status,
            WebRequest request) {
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage());
        return new ResponseEntity<>(exceptionResponse, VALIDATION_ERROR_STATUS);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception e, WebRequest request) {
        log.error(e.getMessage(), e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage());
        return new ResponseEntity<>(exceptionResponse, UNKNOWN_ERROR_STATUS);
    }
}