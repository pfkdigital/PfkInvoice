package com.pfkdigital.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class InvoiceItemNotFoundException extends RuntimeException {
    public InvoiceItemNotFoundException(String message) {
        super(message);
    }
}
