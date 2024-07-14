package com.pfkdigital.api.controller.advice;

import com.pfkdigital.api.exception.ClientNotFoundException;
import com.pfkdigital.api.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Date;

@ControllerAdvice
public class ClientControllerAdvise {
  @ExceptionHandler(ClientNotFoundException.class)
  public ResponseEntity<ApiError> handleClientNotFoundException(ClientNotFoundException exception) {
    ApiError apiError =
        ApiError.builder()
            .status(HttpStatus.NOT_FOUND)
            .message(exception.getMessage())
            .timeStamp(
                Date.from(LocalDateTime.now().atZone(java.time.ZoneId.systemDefault()).toInstant()))
            .build();
    return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
  }
}
