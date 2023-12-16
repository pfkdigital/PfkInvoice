package com.pfkdigital.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.service.InvoiceItemService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(InvoiceItemController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class InvoiceItemControllerTest extends BaseTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private InvoiceItemService invoiceItemService;
  @Autowired private ObjectMapper objectMapper;

  @Test
  public void InvoiceItemController_CreateAnInvoiceItem_ReturnNewInvoiceItem() throws Exception {
    int invoiceId = 1;
    when(invoiceItemService.createInvoiceItem(any(InvoiceItemDTO.class), anyInt()))
        .thenReturn(invoiceItemDTO);

    ResultActions response =
        mockMvc.perform(
            post("/api/v1/invoices/" + invoiceId + "/items")
                .content(objectMapper.writeValueAsString(invoiceItemDTO))
                .contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isCreated())
        .andExpect(
            MockMvcResultMatchers.jsonPath("$.name", CoreMatchers.is(invoiceItemDTO.getName())));
  }

  @Test
  public void InvoiceItemController_UpdateAnInvoiceItem_ReturnString() throws Exception {
    int invoiceItemId = 1;
    String message = "Invoice item of id " + invoiceItemId + " was updated";

    when(invoiceItemService.updateInvoiceItem(any(InvoiceItemDTO.class),anyInt())).thenReturn(message);

    ResultActions response =
        mockMvc.perform(
            patch("/api/v1/invoices/items/" + invoiceItemId)
                .content(objectMapper.writeValueAsString(invoiceItemDTO))
                .contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isAccepted());
  }

  @Test
  public void InvoiceItemService_DeleteInvoice_ReturnString() throws Exception {
    int invoiceItemId = 1;
    String deletedConfirmation = "Invoice item of id " + invoiceItemId + " is not found";

    when(invoiceItemService.deleteInvoiceItem(anyInt())).thenReturn(deletedConfirmation);

    ResultActions response =
        mockMvc.perform(
            delete("/api/v1/invoices/items/" + invoiceItemId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(deletedConfirmation)));

    response.andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk());
  }
}
