package com.pfkdigital.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.service.InvoiceService;
import org.hamcrest.CoreMatchers;
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
public class InvoiceControllerTest extends BaseTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private InvoiceService invoiceService;
  @Autowired private ObjectMapper objectMapper;

  @Test
  public void InvoiceController_CreateNewInvoice_ReturnNewInvoiceDTO() throws Exception {
    when(invoiceService.createInvoice(any(InvoiceWithItemsAndClientDTO.class)))
        .thenReturn(invoiceWithItemsAndClientDTO);

    ResultActions response =
        mockMvc.perform(
            post("/api/v1/invoices")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invoiceWithItemsAndClientDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isCreated())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoiceReference", CoreMatchers.is(invoiceDTO.getInvoiceReference())));
  }

  @Test
  public void InvoiceController_GetAllInvoices_ReturnInvoiceDTOList() throws Exception {
    when(invoiceService.getAllInvoices()).thenReturn(List.of(invoiceDTO));

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices").content(objectMapper.writeValueAsString(List.of(invoiceDTO))));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.size()", CoreMatchers.is(1)));
  }

  @Test
  public void InvoiceService_GetInvoiceById_ReturnInvoiceWithItemsAndClientDTO() throws Exception {
    int invoiceId = 1;
    when(invoiceService.getAnInvoiceById(anyInt())).thenReturn(invoiceWithItemsAndClientDTO);

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/invoices/" + invoiceId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invoiceWithItemsAndClientDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoiceReference",
                CoreMatchers.is(invoiceWithItemsAndClientDTO.getInvoiceReference())));
  }

  @Test
  public void InvoiceController_GetInvoiceById_ReturnInvoiceNotFoundException() throws Exception {
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
  public void InvoiceService_UpdateInvoiceById_ReturnInvoiceWithClientAndItemsDTO()
      throws Exception {
    int invoiceId = 1;

    when(invoiceService.updateInvoice(any(InvoiceWithItemsAndClientDTO.class), anyInt()))
        .thenReturn(invoiceWithItemsAndClientDTO);

    ResultActions response =
        mockMvc.perform(
            put("/api/v1/invoices/" + invoiceId)
                .content(objectMapper.writeValueAsString(invoiceWithItemsAndClientDTO))
                .contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isAccepted())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoiceReference",
                CoreMatchers.is(invoiceWithItemsAndClientDTO.getInvoiceReference())));
  }

  @Test
  public void InvoiceController_DeleteInvoiceById_ReturnString() throws Exception {
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
