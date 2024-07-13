package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientDetailDTO;
import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.exception.ClientNotFoundException;
import com.pfkdigital.api.mapper.ClientMapper;
import com.pfkdigital.api.repository.ClientRepository;
import com.pfkdigital.api.service.impl.ClientServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

  @Mock private ClientRepository clientRepository;
  @Mock private ClientMapper clientMapper;
  @InjectMocks private ClientServiceImpl clientService;

  @Test
  void ClientService_CreateClient_ReturnCreatedClientDTO() {
    String clientName = "Acme Corporation";
    Client client = Client.builder().clientName(clientName).build();
    ClientDTO clientDTO = ClientDTO.builder().clientName(clientName).build();

    when(clientMapper.clientDTOToClient(any(ClientDTO.class))).thenReturn(client);
    when(clientRepository.save(any(Client.class))).thenReturn(client);
    when(clientMapper.clientToClientDTO(client)).thenReturn(clientDTO);

    ClientDTO savedClient = clientService.createNewClient(clientDTO);

    assertNotNull(savedClient);
    assertEquals(clientName, savedClient.getClientName());

    verify(clientRepository).save(any(Client.class));
  }

  @Test
  void ClientService_GetAllClientList_ReturnClientList() {
    String clientName = "Acme Corporation";
    Client client = Client.builder().clientName(clientName).build();
    ClientDTO clientDTO = ClientDTO.builder().clientName(clientName).build();

    when(clientRepository.findAllByOrderByIdAsc()).thenReturn(List.of(client));
    when(clientMapper.clientToClientDTO(any(Client.class))).thenReturn(clientDTO);

    List<ClientDTO> clientList = clientService.getAllClients();

    assertNotNull(clientList);
    assertEquals(1, clientList.size());
    assertEquals(clientName, clientList.get(0).getClientName());
  }

  @Test
  void ClientService_GetLatestClient_ReturnClientList() {
    String clientName = "Acme Corporation";
    Client client = Client.builder().clientName(clientName).id(1).build();
    ClientDTO clientDTO = ClientDTO.builder().clientName(clientName).build();

    when(clientRepository.findLast11OrderByDesc()).thenReturn(List.of(client));
    when(clientMapper.clientToClientDTO(any(Client.class))).thenReturn(clientDTO);

    List<ClientDTO> latestClient = clientService.getLatestClients();

    assertNotNull(latestClient);
    assertEquals(1, latestClient.size());

    verify(clientRepository).findLast11OrderByDesc();
  }

  @Test
  void ClientService_GetClientById_ReturnClient() {
    String clientName = "Acme Corporation";
    int clientId = 1;
    Client client = Client.builder().clientName(clientName).build();
    ClientDetailDTO clientDetailDTO =
        ClientDetailDTO.builder().clientName(clientName).build();

    when(clientRepository.getClientWithInvoicesById(anyInt())).thenReturn(Optional.of(client));
    when(clientMapper.clientToClientWithInvoicesDTO(any(Client.class)))
        .thenReturn(clientDetailDTO);

    ClientDetailDTO selectedClient = clientService.getClientById(clientId);

    assertNotNull(selectedClient);
    assertEquals(clientName, selectedClient.getClientName());

    verify(clientRepository).getClientWithInvoicesById(anyInt());
  }

  @Test
  void ClientService_GetClientById_ThrowClientNotFoundException() {
    int clientId = 1;
    when(clientRepository.getClientWithInvoicesById(anyInt())).thenReturn(Optional.empty());

    assertThrows(ClientNotFoundException.class, () -> clientService.getClientById(clientId));

    verify(clientRepository).getClientWithInvoicesById(anyInt());
  }

  @Test
  void ClientService_GetClientCount_ReturnCount() {
    when(clientRepository.count()).thenReturn(1L);

    CountDTO clientCount = clientService.getClientsCount();

    assertNotNull(clientCount);
    assertEquals(1L, clientCount.getStatus());

    verify(clientRepository).count();
  }

  @Test
  void ClientService_UpdateClientById_ReturnClientDTO() {
    int clientId = 1;
    Client client = Client.builder().clientName("Client name").build();
    ClientDTO clientDTO = ClientDTO.builder().clientName("Client Name").build();
    Client updatedClient = Client.builder().clientName("Updated Client name").build();
    ClientDTO updatedClientDTO = ClientDTO.builder().clientName("Updated Client Name").build();

    when(clientMapper.clientDTOToClient(any(ClientDTO.class))).thenReturn(client);
    when(clientRepository.findById(anyInt())).thenReturn(Optional.of(client));
    when(clientRepository.save(any(Client.class))).thenReturn(updatedClient);
    when(clientMapper.clientToClientDTO(any(Client.class))).thenReturn(updatedClientDTO);

    ClientDTO resultClientDTO = clientService.updateClient(clientDTO, clientId);

    assertNotNull(resultClientDTO);

    verify(clientMapper).clientDTOToClient(any(ClientDTO.class));
    verify(clientRepository).findById(anyInt());
    verify(clientRepository).save(any(Client.class));
    verify(clientMapper).clientToClientDTO(any(Client.class));
  }

  @Test
  void ClientService_DeleteClientById_ClientDeleted() {
    int clientId = 1;
    Client client = Client.builder().clientName("Client name").build();

    when(clientRepository.findById(anyInt())).thenReturn(Optional.of(client));
    doNothing().when(clientRepository).delete(any(Client.class));

    assertAll(() -> clientService.deleteClientById(clientId));

    verify(clientRepository).findById(anyInt());
    verify(clientRepository).delete(any(Client.class));
  }

  @Test
  void ClientService_DeleteClientById_ThrowClientNotFoundException() {
    int clientId = 1;
    when(clientRepository.findById(anyInt())).thenReturn(Optional.empty());

    assertThrows(ClientNotFoundException.class, () -> clientService.deleteClientById(clientId));

    verify(clientRepository).findById(anyInt());
  }
}
