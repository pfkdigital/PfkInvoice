package com.pfkdigital.api.utility;

import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.entity.Invoice;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class GraphUtilityTest {

  @InjectMocks private GraphUtility graphUtility;

  @Test
  public void GraphUtility_CreateGraphData_ReturnListOfGraphDto() {
    // Arrange
    Invoice mockInvoice = Invoice.builder().invoiceStatus("Paid").paymentDue(LocalDateTime.now()).total(BigDecimal.valueOf(100)).build();
    List<Invoice> invoices = Collections.singletonList(mockInvoice);
    // Act
    List<GraphDataDTO> graphData = graphUtility.createGraphData(invoices);

    // Assert
    assertNotNull(graphData);
    assertEquals(1, graphData.size());
    assertEquals("July", graphData.get(0).getMonth());
    assertEquals(BigDecimal.valueOf(100), graphData.get(0).getRevenue());
  }

  @Test
  void GraphUtility_CreateGraphData_ReturnEmptyList() {
    Invoice mockInvoice = Invoice.builder().invoiceStatus("Unpaid").paymentDue(LocalDateTime.now()).total(BigDecimal.valueOf(100)).build();
    List<Invoice> invoices = List.of(mockInvoice);

    List<GraphDataDTO> graphData = graphUtility.createGraphData(invoices);

    assertNotNull(graphData);
    assertEquals(0, graphData.size());
  }

  @Test
  void GraphUtility_CreateGraphData_ReturnSumOfRevenues() {
    Invoice mockInvoice1 = Invoice.builder().invoiceStatus("Paid").paymentDue(LocalDateTime.now()).total(BigDecimal.valueOf(100)).build();
    Invoice mockInvoice2 = Invoice.builder().invoiceStatus("Paid").paymentDue(LocalDateTime.now()).total(BigDecimal.valueOf(200)).build();
    List<Invoice> invoices = List.of(mockInvoice1, mockInvoice2);

    List<GraphDataDTO> graphData = graphUtility.createGraphData(invoices);

    assertNotNull(graphData);
    assertEquals(1, graphData.size());
    assertEquals("July", graphData.get(0).getMonth());
    assertEquals(BigDecimal.valueOf(300), graphData.get(0).getRevenue());
  }
}
