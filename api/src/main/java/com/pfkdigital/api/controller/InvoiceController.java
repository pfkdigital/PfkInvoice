package com.pfkdigital.api.controller;

import com.pfkdigital.api.dto.*;
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

  @PostMapping
  public ResponseEntity<?> createNewInvoice(@RequestBody InvoiceDetailDTO invoiceDTO) {
    return new ResponseEntity<>(invoiceService.createInvoice(invoiceDTO), HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<InvoiceDTO>> getAllInvoices() {
    return new ResponseEntity<>(invoiceService.getAllInvoices(), HttpStatus.OK);
  }

  @GetMapping("/latest")
  public ResponseEntity<List<InvoiceDTO>> getLatestInvoices() {
    return new ResponseEntity<>(invoiceService.getLatestInvoices(), HttpStatus.OK);
  }

  @GetMapping("/graph")
  public ResponseEntity<List<GraphDataDTO>> getRevenueByMonth() {
    return new ResponseEntity<>(invoiceService.getRevenueByMonth(), HttpStatus.OK);
  }

  @GetMapping("/{invoiceId}")
  public ResponseEntity<?> getAnInvoiceById(@PathVariable Integer invoiceId) {
    return new ResponseEntity<>(invoiceService.getAnInvoiceById(invoiceId), HttpStatus.OK);
  }

  @GetMapping("/total")
  public ResponseEntity<CurrencyDTO> getAllInvoiceTotalSum() {
    return new ResponseEntity<>(invoiceService.getAllInvoiceTotalSum(), HttpStatus.OK);
  }

  @GetMapping("/unpaid/total")
  public ResponseEntity<CurrencyDTO> getAllInvoiceTotalSumUnpaid() {
    return new ResponseEntity<>(invoiceService.getAllInvoiceTotalSumUnpaid(), HttpStatus.OK);
  }

  @GetMapping("/count")
  public ResponseEntity<CountDTO> getInvoiceCount() {
    return new ResponseEntity<>(invoiceService.getInvoicesCount(), HttpStatus.OK);
  }

  @PutMapping("/{invoiceId}")
  public ResponseEntity<?> updateAnInvoice(
          @RequestBody InvoiceDetailDTO invoiceDTO, @PathVariable Integer invoiceId) {
    return new ResponseEntity<>(
        invoiceService.updateInvoice(invoiceDTO, invoiceId), HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/{invoiceId}")
  public ResponseEntity<?> deleteInvoiceById(@PathVariable Integer invoiceId) {
    return new ResponseEntity<>(invoiceService.deleteInvoiceById(invoiceId), HttpStatus.OK);
  }
}
