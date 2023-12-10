package com.pfkdigital.api.exception;

public class InvoiceItemNotFoundException extends RuntimeException {
    public InvoiceItemNotFoundException(String message) {
        super(message);
    }
}
