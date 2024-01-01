package com.pfkdigital.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.repository.InvoiceItemRepository;
import com.pfkdigital.api.service.InvoiceItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/invoices")
@RequiredArgsConstructor
public class InvoiceItemController {

    private final InvoiceItemService invoiceItemService;

    @GetMapping("/items")
    public ResponseEntity<List<InvoiceItemDTO>> getAllInvoiceItems(){
        return new ResponseEntity<>(invoiceItemService.getAllInvoiceItem(),HttpStatus.OK);
    }
    @GetMapping("/items/{itemId}")
    public ResponseEntity<?> getInvoiceItemById(@PathVariable Integer itemId){
        return new ResponseEntity<>(invoiceItemService.getInvoiceItemById(itemId),HttpStatus.OK);
    }
    @PostMapping("/{invoiceId}/items")
    public ResponseEntity<?> createInvoiceItem(@RequestBody InvoiceItemDTO invoiceItemDTO, @PathVariable Integer invoiceId){
        return new ResponseEntity<>(invoiceItemService.createInvoiceItem(invoiceItemDTO,invoiceId), HttpStatus.CREATED);
    }

    @PutMapping ("/items/{invoiceItemId}")
    public ResponseEntity<?> updateAnInvoiceItem(@RequestBody InvoiceItemDTO invoiceItemDTO, @PathVariable Integer invoiceItemId ){
        return new ResponseEntity<>(invoiceItemService.updateInvoiceItem(invoiceItemDTO,invoiceItemId),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{invoiceId}/items/{invoiceItemId}")
    public ResponseEntity<?> deleteAnInvoiceItemById(@PathVariable Integer invoiceId,@PathVariable Integer invoiceItemId) {
        return new ResponseEntity<>(invoiceItemService.deleteInvoiceItem(invoiceId,invoiceItemId),HttpStatus.OK);
    }
}
