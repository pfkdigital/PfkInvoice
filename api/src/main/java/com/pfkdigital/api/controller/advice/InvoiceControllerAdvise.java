package com.pfkdigital.api.controller.advice;

import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class InvoiceControllerAdvise {
  @ExceptionHandler(InvoiceNotFoundException.class)
  public ResponseEntity<ApiError> handleInvoiceNotFoundException(
      InvoiceNotFoundException exception) {
    ApiError apiError =
        ApiError.builder()
            .status(HttpStatus.NOT_FOUND)
            .message(exception.getMessage())
            .timeStamp(LocalDateTime.now())
            .build();
    return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
  }
}
