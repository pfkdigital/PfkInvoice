package com.pfkdigital.api.controller;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/client/{clientId}")
    public ResponseEntity<Invoice> createAnInvoice(@PathVariable Integer clientId,@RequestBody InvoiceDTO invoiceDto){
        return new ResponseEntity<>(invoiceService.createInvoice(clientId,invoiceDto),HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices(){
        return new ResponseEntity<>(invoiceService.getAllInvoices(),HttpStatus.OK);
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<?> getAnInvoiceById(@PathVariable Integer invoiceId){
        return new ResponseEntity<>(invoiceService.getInvoiceById(invoiceId),HttpStatus.OK);
    }

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<String> deleteInvoiceById(@PathVariable Integer invoiceId){
        return new ResponseEntity<>(invoiceService.deleteInvoiceById(invoiceId),HttpStatus.OK);
    }
}
