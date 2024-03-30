package com.pfkdigital.api.service;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientWithInvoicesDTO;
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
public class ClientServiceTest extends BaseTest {

    @Mock
    private ClientRepository clientRepository;
    @Mock
    private ClientMapper clientMapper;
    @InjectMocks
    private ClientServiceImpl clientService;
    @Test
    public void ClientService_CreateClient_ReturnCreatedClientDTO(){
        String clientName = "Acme Corporation";

        when(clientMapper.clientDTOToClient(any(ClientDTO.class))).thenReturn(client);
        when(clientRepository.save(any(Client.class))).thenReturn(client);
        when(clientMapper.clientToClientDTO(client)).thenReturn(clientDTO);

        ClientDTO savedClient = clientService.createNewClient(clientDTO);

        assertNotNull(savedClient);
        assertEquals(clientName,savedClient.getClientName());

        verify(clientRepository).save(any(Client.class));
    }
    @Test
    public void ClientService_GetClientList_ReturnClientList(){

        when(clientRepository.findAllByOrderByIdAsc()).thenReturn(List.of(client));
        when(clientMapper.clientToClientDTO(any(Client.class))).thenReturn(clientDTO);

        List<ClientDTO> clientDTOList = clientService.getAllClients();

        assertNotNull(clientDTOList);
        assertEquals(1,clientDTOList.size());

        verify(clientRepository).findAllByOrderByIdAsc();
    }
    @Test
    public void ClientService_GetClientById_ReturnClient(){
        String clientName = "Acme Corporation";
        int clientId = 1;

        when(clientRepository.getClientById(anyInt())).thenReturn(Optional.of(client));
        when(clientMapper.clientToClientWithInvoicesDTO(any(Client.class))).thenReturn(clientWithInvoicesDTO);

        ClientWithInvoicesDTO selectedClient = clientService.getClientById(clientId);

        assertNotNull(selectedClient);
        assertEquals(clientName,selectedClient.getClientName());

        verify(clientRepository).getClientById(anyInt());
    }

    @Test
    public void ClientService_GetClientCount_ReturnCount() {
       when(clientRepository.count()).thenReturn(1L);

       CountDTO clientCount = clientService.getClientsCount();

       assertNotNull(clientCount);
       assertEquals(1l,clientCount.getStatus());

       verify(clientRepository).count();
    }
    @Test
    public void ClientService_GetClientById_ThrowClientNotFoundException(){
        int clientId = 1;
        when(clientRepository.getClientById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ClientNotFoundException.class, () -> clientService.getClientById(clientId));

        verify(clientRepository).getClientById(anyInt());
    }
    @Test
    public void ClientService_UpdateClientById_ReturnClientDTO(){
        int clientId = 1;
        Client updatedClient = Client.builder().clientName("Updated client name").build();
        ClientDTO updatedClientDTO = ClientDTO.builder().clientName("Updated client dto").build();

        when(clientMapper.clientDTOToClient(any(ClientDTO.class))).thenReturn(client);
        when(clientRepository.getClientById(anyInt())).thenReturn(Optional.of(client));
        when(clientRepository.save(any(Client.class))).thenReturn(updatedClient);
        when(clientMapper.clientToClientDTO(any(Client.class))).thenReturn(updatedClientDTO);

        ClientDTO resultClientDTO = clientService.updateClient(clientDTO,clientId);

        assertNotNull(resultClientDTO);
    }
    @Test
    public void ClientService_UpdateClientById_ThrowClientNotFoundException(){
        int clientId = 1;
        when(clientRepository.getClientById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ClientNotFoundException.class, () -> clientService.getClientById(clientId));

        verify(clientRepository).getClientById(anyInt());
    }
    @Test
    public void ClientService_DeleteClientById_ClientDeleted(){
        int clientId = 1;

        when(clientRepository.getClientById(anyInt())).thenReturn(Optional.of(client));
        doNothing().when(clientRepository).delete(any(Client.class));

        assertAll(() -> clientService.deleteClientById(clientId));
        verify(clientRepository).getClientById(anyInt());
        verify(clientRepository).delete(any(Client.class));
    }
    @Test
    public void ClientService_DeleteClientById_ThrowClientNotFoundException(){
        int clientId = 1;
        when(clientRepository.getClientById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ClientNotFoundException.class, () -> clientService.getClientById(clientId));

        verify(clientRepository).getClientById(anyInt());
    }
}
