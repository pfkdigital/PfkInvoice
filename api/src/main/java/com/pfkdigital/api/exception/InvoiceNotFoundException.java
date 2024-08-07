package com.pfkdigital.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class InvoiceNotFoundException extends RuntimeException {
  public InvoiceNotFoundException(String message) {
    super(message);
  }
}
