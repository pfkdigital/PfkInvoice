package com.pfkdigital.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.service.DashboardService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = DashboardController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class DashboardControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private DashboardService dashboardService;

  @Test
  void DashboardController_GetInvoicesCount_ReturnInvoicesCountDTO() throws Exception {
    when(dashboardService.getInvoicesCount())
        .thenReturn(CountDTO.builder().label("Invoices").status(1).build());
    mockMvc
        .perform(get("/api/v1/dashboard/invoices/count"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.label").value("Invoices"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(1));
  }

  @Test
  void DashboardController_GetClientsCount_ReturnClientsCountDTO() throws Exception {
    when(dashboardService.getClientsCount())
        .thenReturn(CountDTO.builder().label("Clients").status(1).build());
    mockMvc
        .perform(get("/api/v1/dashboard/clients/count"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.label").value("Clients"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(1));
  }

  @Test
  void DashboardController_GetAllInvoiceTotalSum_ReturnCurrencyDTO() throws Exception {
    when(dashboardService.getSumOfInvoiceTotals())
        .thenReturn(CurrencyDTO.builder().label("Revenue").status("1000").build());
    mockMvc
        .perform(get("/api/v1/dashboard/invoices/total-sum"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.label").value("Revenue"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("1000"));
  }

  @Test
  void DashboardController_GetAllInvoiceTotalSumUnpaid_ReturnCurrencyDTO() throws Exception {
    when(dashboardService.getSumOfInvoiceTotalsUnpaid())
        .thenReturn(CurrencyDTO.builder().label("Unpaid Revenue").status("1000").build());

    mockMvc
        .perform(get("/api/v1/dashboard/invoices/total-sum/unpaid"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.label").value("Unpaid Revenue"))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("1000"));
  }

  @Test
  void DashboardController_GetRevenueByMonth_ReturnGraphDataDTO() throws Exception {
    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("January").value(BigDecimal.valueOf(1000)).build();
    when(dashboardService.getRevenueByMonth()).thenReturn(List.of(graphDataDTO));

    mockMvc
        .perform(get("/api/v1/dashboard/revenue/monthly"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].key").value("January"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].value").value(1000));
  }

  @Test
  void DashboardController_CountInvoicesByMonth_ReturnGraphDataDTO() throws Exception {
    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("January").value(BigDecimal.valueOf(1000)).build();
    when(dashboardService.countInvoicesByMonth()).thenReturn(List.of(graphDataDTO));

    mockMvc
        .perform(get("/api/v1/dashboard/invoices/count/monthly"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].key").value("January"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].value").value(1000));
  }

  @Test
  void DashboardController_CalculatePaidVsUnpaidProportion_ReturnGraphDataDTO() throws Exception {
    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("Paid").value(BigDecimal.valueOf(0.5)).build();
    GraphDataDTO graphDataDTO2 =
        GraphDataDTO.builder().key("Unpaid").value(BigDecimal.valueOf(0.5)).build();
    when(dashboardService.calculatePaidVsUnpaidProportion())
        .thenReturn(List.of(graphDataDTO, graphDataDTO2));

    mockMvc
        .perform(get("/api/v1/dashboard/invoices/proportion/paid-vs-unpaid"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].key").value("Paid"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].value").value(0.5))
        .andExpect(MockMvcResultMatchers.jsonPath("$[1].key").value("Unpaid"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[1].value").value(0.5));
  }

  @Test
  void DashboardController_GetTopClientsByTotalAmount_ReturnGraphDataDTO() throws Exception {
    GraphDataDTO graphDataDTO =
        GraphDataDTO.builder().key("Client 1").value(BigDecimal.valueOf(1000)).build();
    when(dashboardService.getTopClientsByTotalAmount()).thenReturn(List.of(graphDataDTO));

    mockMvc
        .perform(get("/api/v1/dashboard/clients/top-by-total-amount"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].key").value("Client 1"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].value").value(1000));
  }
}
