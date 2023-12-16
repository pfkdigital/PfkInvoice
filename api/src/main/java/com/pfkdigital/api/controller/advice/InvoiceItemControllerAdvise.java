package com.pfkdigital.api.controller.advice;

import com.pfkdigital.api.exception.InvoiceItemNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class InvoiceItemControllerAdvise {
    @ExceptionHandler(InvoiceItemNotFoundException.class)
    public ResponseEntity<String> handleInvoiceItemNotFoundException(InvoiceItemNotFoundException exception){
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }
}
