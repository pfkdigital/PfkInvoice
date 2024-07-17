package com.pfkdigital.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfkdigital.api.dto.*;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.service.InvoiceService;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(controllers = InvoiceController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class InvoiceControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private InvoiceService invoiceService;
  @Autowired private ObjectMapper objectMapper;

  private InvoiceDTO invoiceDTO;
  private InvoiceDetailDTO invoiceDetailDTO;
  private CurrencyDTO currencyDTO;
  private CountDTO countDTO;

  @BeforeEach
  void setUp() {
    invoiceDTO = InvoiceDTO.builder().invoiceReference("INV-001").build();
    invoiceDetailDTO =
        InvoiceDetailDTO.builder().invoiceReference("INV-001").build();
    currencyDTO = CurrencyDTO.builder().label("Revenue").status("15K").build();
    countDTO = CountDTO.builder().label("Invoice").status(1L).build();

    ClientDTO clientDTO = ClientDTO.builder().clientName("Acme Company").build();
    InvoiceItemDTO invoiceItem = InvoiceItemDTO.builder().name("Item 1").quantity(1).build();

    invoiceDetailDTO.setClient(clientDTO);
    invoiceDetailDTO.setInvoiceItems(List.of(invoiceItem));
  }

  @Test
  void InvoiceController_CreateNewInvoice_ReturnNewInvoiceDTO() throws Exception {
    when(invoiceService.createInvoice(any(InvoiceDetailDTO.class)))
        .thenReturn(invoiceDetailDTO);

    ResultActions response =
        mockMvc.perform(
            post("/api/v1/invoices")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invoiceDetailDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isCreated())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoiceReference", CoreMatchers.is(invoiceDTO.getInvoiceReference())))
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.client.clientName",
                CoreMatchers.is(invoiceDetailDTO.getClient().getClientName())))
        .andExpect(MockMvcResultMatchers.jsonPath("$.invoiceItems.size()", CoreMatchers.is(1)));
  }

  @Test
  void InvoiceController_GetAllInvoices_ReturnInvoiceDTOList() throws Exception {
    when(invoiceService.getAllInvoices()).thenReturn(List.of(invoiceDTO));

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices").content(objectMapper.writeValueAsString(List.of(invoiceDTO))));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.size()", CoreMatchers.is(1)))
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$[0].invoiceReference", CoreMatchers.is(invoiceDTO.getInvoiceReference())));
  }

  @Test
  void InvoiceService_GetInvoiceById_ReturnInvoiceWithItemsAndClientDTO() throws Exception {
    int invoiceId = 1;
    when(invoiceService.getAnInvoiceById(anyInt())).thenReturn(invoiceDetailDTO);

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices/" + invoiceId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invoiceDetailDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoiceReference",
                CoreMatchers.is(invoiceDetailDTO.getInvoiceReference())));
  }

  @Test
  void InvoiceController_GetInvoiceById_ReturnInvoiceNotFoundException() throws Exception {
    int invoiceId = 1;
    when(invoiceService.getAnInvoiceById(anyInt())).thenThrow(InvoiceNotFoundException.class);

    doThrow(new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"))
        .when(invoiceService)
        .getAnInvoiceById(anyInt());

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices/" + invoiceId).contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isNotFound());
  }

  @Test
  void InvoiceController_GetInvoiceTotalSums_ReturnSum() throws Exception {
    when(invoiceService.getAllInvoiceTotalSum()).thenReturn(currencyDTO);

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices/total")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(currencyDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.jsonPath(("$.status"), CoreMatchers.is(currencyDTO.getStatus())));
  }

  @Test
  void InvoiceController_GetUnpaidInvoiceTotalSums_ReturnSum() throws Exception {
    when(invoiceService.getAllInvoiceTotalSumUnpaid()).thenReturn(currencyDTO);

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices/unpaid/total")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(currencyDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.jsonPath("$.status", CoreMatchers.is(currencyDTO.getStatus())));
  }

  @Test
  void InvoiceController_GetInvoiceCount_ReturnCount() throws Exception {
    when(invoiceService.getInvoicesCount()).thenReturn(countDTO);

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices/count")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(countDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.status", CoreMatchers.is(Long.valueOf(countDTO.getStatus()).intValue())));
  }

  @Test
  void InvoiceService_UpdateInvoiceById_ReturnInvoiceWithClientAndItemsDTO()
      throws Exception {
    int invoiceId = 1;

    when(invoiceService.updateInvoice(any(InvoiceDetailDTO.class), anyInt()))
        .thenReturn(invoiceDetailDTO);

    ResultActions response =
        mockMvc.perform(
            put("/api/v1/invoices/" + invoiceId)
                .content(objectMapper.writeValueAsString(invoiceDetailDTO))
                .contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isAccepted())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoiceReference",
                CoreMatchers.is(invoiceDetailDTO.getInvoiceReference())));
  }

  @Test
  void InvoiceController_DeleteInvoiceById_ReturnString() throws Exception {
    int invoiceId = 1;
    String deletedStatement = "Invoice of id " + invoiceId + " was deleted";

    when(invoiceService.deleteInvoiceById(anyInt())).thenReturn(deletedStatement);

    ResultActions response =
        mockMvc.perform(
            delete("/api/v1/invoices/" + invoiceId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(deletedStatement)));

    response.andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk());
  }
}
