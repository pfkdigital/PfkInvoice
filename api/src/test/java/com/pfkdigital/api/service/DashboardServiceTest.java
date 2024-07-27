package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.repository.ClientRepository;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.impl.DashboardServiceImpl;
import com.pfkdigital.api.utility.FormatterUtility;
import com.pfkdigital.api.utility.GraphUtility;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DashboardServiceTest {
  @Mock private ClientRepository clientRepository;
  @Mock private InvoiceRepository invoiceRepository;
  @Mock private FormatterUtility formatterUtility;
  @Mock private GraphUtility graphUtility;

  @InjectMocks private DashboardServiceImpl dashboardService;

  @Test
  void DashboardService_GetInvoicesCount_ReturnsCountDTO() {
    when(invoiceRepository.count()).thenReturn(1L);

    CountDTO result = dashboardService.getInvoicesCount();

    assertEquals("Invoices", result.getLabel());
    assertEquals(1L, result.getStatus());

    verify(invoiceRepository).count();
  }

  @Test
  void DashboardService_GetClientsCount_ReturnsCountDTO() {
    when(clientRepository.count()).thenReturn(1L);

    CountDTO result = dashboardService.getClientsCount();

    assertEquals("Clients", result.getLabel());
    assertEquals(1L, result.getStatus());

    verify(clientRepository).count();
  }

  @Test
  void DashboardService_GetSumOfInvoiceTotals_ReturnsCurrencyDTO() {
    when(invoiceRepository.getSumOfAllTotalInvoices()).thenReturn(BigDecimal.valueOf(10000));
    when(formatterUtility.formatBigDecimal(any(BigDecimal.class))).thenReturn("10K");

    CurrencyDTO result = dashboardService.getSumOfInvoiceTotals();

    assertEquals("Revenue", result.getLabel());
    assertEquals("10K", result.getStatus());

    verify(invoiceRepository).getSumOfAllTotalInvoices();
    verify(formatterUtility).formatBigDecimal(any(BigDecimal.class));
  }

  @Test
  void DashboardService_GetSumOfInvoiceTotalsUnpaid_ReturnsCurrencyDTO() {
    when(invoiceRepository.getSumOfAllTotalInvoicesUnpaid()).thenReturn(BigDecimal.valueOf(10000));
    when(formatterUtility.formatBigDecimal(any(BigDecimal.class))).thenReturn("10K");

    CurrencyDTO result = dashboardService.getSumOfInvoiceTotalsUnpaid();

    assertEquals("Unpaid Revenue", result.getLabel());
    assertEquals("10K", result.getStatus());

    verify(invoiceRepository).getSumOfAllTotalInvoicesUnpaid();
    verify(formatterUtility).formatBigDecimal(any(BigDecimal.class));
  }

  @Test
  void DashboardService_GetRevenueByMonth_ReturnsListOfGraphDataDTO() {
    Invoice invoice = Invoice.builder().total(BigDecimal.valueOf(100)).build();
    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("month").value(BigDecimal.valueOf(1000)).build();

    when(invoiceRepository.findAll()).thenReturn(List.of(invoice));
    when(graphUtility.createGraphData(any())).thenReturn(List.of(graphDataDTO));

    List<GraphDataDTO> result = dashboardService.getRevenueByMonth();

    assertEquals("month", result.get(0).getKey());
    assertEquals(BigDecimal.valueOf(1000), result.get(0).getValue());
  }

  @Test
  void DashboardService_CountInvoicesByMonth_ReturnsListOfGraphDataDTO() {
    Invoice invoice = Invoice.builder().total(BigDecimal.valueOf(100)).build();
    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("March").value(BigDecimal.valueOf(1000)).build();

    when(invoiceRepository.findAll()).thenReturn(List.of(invoice));
    when(graphUtility.countInvoicesByMonth(any())).thenReturn(List.of(graphDataDTO));

    List<GraphDataDTO> result = dashboardService.countInvoicesByMonth();

    assertEquals("March", result.get(0).getKey());
    assertEquals(BigDecimal.valueOf(1000), result.get(0).getValue());
  }

  @Test
  void DashboardService_CalculatePaidVsUnpaidProportion_ReturnsListOfGraphDataDTO() {
    Invoice invoice = Invoice.builder().total(BigDecimal.valueOf(100)).build();

    GraphDataDTO paid = new GraphDataDTO("paid", BigDecimal.valueOf(50));
    GraphDataDTO unpaid = new GraphDataDTO("unpaid", BigDecimal.valueOf(50));

    when(invoiceRepository.findAll()).thenReturn(List.of(invoice));
    when(graphUtility.calculatePaidVsUnpaidProportion(any())).thenReturn(List.of(paid, unpaid));

    List<GraphDataDTO> result = dashboardService.calculatePaidVsUnpaidProportion();

    assertEquals("paid", result.get(0).getKey());
    assertEquals(BigDecimal.valueOf(50), result.get(0).getValue());
    assertEquals("unpaid", result.get(1).getKey());
    assertEquals(BigDecimal.valueOf(50), result.get(1).getValue());
  }

  @Test
  void DashboardService_GetTopClientsByTotalAmount_ReturnsListOfGraphDataDTO() {
    Invoice invoice = Invoice.builder().total(BigDecimal.valueOf(100)).build();
    invoice.setClient(Client.builder().clientName("Client").build());

    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("Client").value(BigDecimal.valueOf(1000)).build();

    when(invoiceRepository.findAll()).thenReturn(List.of(invoice));
    when(graphUtility.getTopClientsByInvoiceAmount(any())).thenReturn(List.of(graphDataDTO));

    List<GraphDataDTO> result = dashboardService.getTopClientsByTotalAmount();

    assertEquals("Client", result.get(0).getKey());
    assertEquals(BigDecimal.valueOf(1000), result.get(0).getValue());
  }
}
