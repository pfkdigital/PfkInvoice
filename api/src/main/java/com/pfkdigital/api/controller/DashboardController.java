package com.pfkdigital.api.controller;

import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
  private final DashboardService dashboardService;

  @GetMapping("/invoices/count")
  public ResponseEntity<CountDTO> getInvoicesCount() {
    return new ResponseEntity<>(dashboardService.getInvoicesCount(), HttpStatus.OK);
  }

  @GetMapping("/clients/count")
  public ResponseEntity<CountDTO> getClientsCount() {
    return new ResponseEntity<>(dashboardService.getClientsCount(), HttpStatus.OK);
  }

  @GetMapping("/invoices/total-sum")
  public ResponseEntity<CurrencyDTO> getAllInvoiceTotalSum() {
    return new ResponseEntity<>(dashboardService.getSumOfInvoiceTotals(), HttpStatus.OK);
  }

  @GetMapping("/invoices/total-sum/unpaid")
  public ResponseEntity<CurrencyDTO> getAllInvoiceTotalSumUnpaid() {
    return new ResponseEntity<>(dashboardService.getSumOfInvoiceTotalsUnpaid(), HttpStatus.OK);
  }

  @GetMapping("/revenue/monthly")
  public ResponseEntity<List<GraphDataDTO>> getRevenueByMonth() {
    return new ResponseEntity<>(dashboardService.getRevenueByMonth(), HttpStatus.OK);
  }

  @GetMapping("/invoices/count/monthly")
  public ResponseEntity<List<GraphDataDTO>> countInvoicesByMonth() {
    return new ResponseEntity<>(dashboardService.countInvoicesByMonth(), HttpStatus.OK);
  }

  @GetMapping("/invoices/proportion/paid-vs-unpaid")
  public ResponseEntity<List<GraphDataDTO>> calculatePaidVsUnpaidProportion() {
    return new ResponseEntity<>(dashboardService.calculatePaidVsUnpaidProportion(), HttpStatus.OK);
  }

  @GetMapping("/clients/top-by-total-amount")
  public ResponseEntity<List<GraphDataDTO>> getTopClientsByTotalAmount() {
    return new ResponseEntity<>(dashboardService.getTopClientsByTotalAmount(), HttpStatus.OK);
  }
}
