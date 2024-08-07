package com.pfkdigital.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientDetailDTO;
import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.exception.ClientNotFoundException;
import com.pfkdigital.api.service.ClientService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

@WebMvcTest(controllers = ClientController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class ClientControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private ClientService clientService;
  @Autowired private ObjectMapper objectMapper;

  private ClientDTO clientDTO;
  private ClientDetailDTO clientDetailDTO;
  private CountDTO countDTO;
  private InvoiceDTO invoiceDTO;

  @BeforeEach
  void setUp() {
    clientDTO = ClientDTO.builder().clientName("Acme Company").build();
    countDTO = CountDTO.builder().label("Count").status(1L).build();
    InvoiceDTO invoice = InvoiceDTO.builder().invoiceReference("INV-001").build();
    clientDetailDTO =
        ClientDetailDTO.builder().clientName("Acme Company").invoices(List.of(invoice)).build();
  }

  @Test
  void ClientController_CreateClient_ReturnCreatedClientDTO() throws Exception {
    when(clientService.createNewClient(any(ClientDTO.class))).thenReturn(clientDTO);

    ResultActions response =
        mockMvc.perform(
            post("/api/v1/clients")
                .content(objectMapper.writeValueAsString(clientDTO))
                .contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isCreated())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.clientName", CoreMatchers.is(clientDTO.getClientName())));
  }

  @Test
  void ClientController_GetClientList_ReturnClientList() throws Exception {
    when(clientService.getAllClients()).thenReturn(List.of(clientDTO));

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(List.of(clientDTO))));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.size()", CoreMatchers.is(1)));
  }

  @Test
  void ClientController_GetClientById_ReturnClientWithInvoiceItemAndClient() throws Exception {
    int clientId = 1;

    when(clientService.getClientById(anyInt())).thenReturn(clientDetailDTO);

    ResultActions response =
        mockMvc.perform(
            get("/api/v1/clients/" + clientId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(clientDetailDTO)));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.clientName", CoreMatchers.is(clientDetailDTO.getClientName())))
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.invoices[0].invoiceReference",
                CoreMatchers.is(clientDetailDTO.getInvoices().get(0).getInvoiceReference())));
  }

  @Test
  void ClientController_GetClientById_ThrowClientNotFoundException() throws Exception {
    int clientId = 1;
    String message = "Client of id " + clientId + " was not found";

    doThrow(new ClientNotFoundException(message)).when(clientService).getClientById(anyInt());

    ResultActions response =
        mockMvc.perform(get("/api/v1/clients/" + clientId).contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isNotFound());
  }

  @Test
  void ClientController_UpdateInvoiceById_ReturnClientWithInvoices() throws Exception {
    int clientId = 1;

    when(clientService.updateClient(any(ClientDTO.class), anyInt())).thenReturn(clientDTO);

    ResultActions response =
        mockMvc.perform(
            put("/api/v1/clients/" + clientId)
                .content(objectMapper.writeValueAsString(clientDTO))
                .contentType(MediaType.APPLICATION_JSON));

    response
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isCreated())
        .andExpect(
            MockMvcResultMatchers.jsonPath(
                "$.clientName", CoreMatchers.is(clientDTO.getClientName())));
  }

  @Test
  void InvoiceController_DeleteInvoiceById_ReturnString() throws Exception {
    int clientId = 1;
    String deletedStatement = "Client of id " + clientId + " was deleted";

    when(clientService.deleteClientById(anyInt())).thenReturn(deletedStatement);

    ResultActions response =
        mockMvc.perform(
            delete("/api/v1/clients/" + clientId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(deletedStatement)));

    response.andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk());
  }
}
