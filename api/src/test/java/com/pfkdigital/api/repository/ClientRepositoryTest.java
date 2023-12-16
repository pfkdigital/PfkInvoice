package com.pfkdigital.api.repository;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.entity.Client;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class ClientRepositoryTest extends BaseTest {

  @Autowired private ClientRepository clientRepository;
  @Test
  public void ClientRepository_CreateClient_ReturnNewClient() {
    String clientName = "Acme Corporation";
    Client savedClient = clientRepository.save(mockClient);

    assertNotNull(savedClient);
    assertEquals(clientName, savedClient.getClientName());
  }

  @Test
  public void ClientRepository_GetAllClients_ReturnAListOfClients() {
    String clientName = "Acme Corporation";
    Client savedClient = clientRepository.save(mockClient);

    List<Client> clients = clientRepository.findAll();

    assertNotNull(clients);
    assertEquals(1, clients.size());
    assertEquals(clientName, clients.get(0).getClientName());
  }

  @Test
  public void ClientRepository_GetClientById_ReturnAClient() {
    String clientName = "Acme Corporation";
    Client savedClient = clientRepository.save(mockClient);

    Client selectedClient = clientRepository.getClientById(savedClient.getId()).get();

    assertNotNull(selectedClient);
    assertEquals(clientName, selectedClient.getClientName());
    assertNull(selectedClient.getInvoices());
  }

  @Test
  public void ClientRepository_UpdateClient_ReturnUpdatedClient() {
    String updatedClientName = "Updated Corporation";
    Client savedClient = clientRepository.save(mockClient);

    Client selectedClient = clientRepository.getClientById(savedClient.getId()).get();
    selectedClient.setClientName(updatedClientName);
    Client updatedClient = clientRepository.save(selectedClient);

    assertNotNull(updatedClient);
    assertEquals(updatedClientName, updatedClient.getClientName());
  }

  @Test
  public void ClientRepository_DeleteClientById_ClientDeleted() {
    Client savedClient = clientRepository.save(mockClient);

    clientRepository.delete(savedClient);

    Optional<Client> deletedClient = clientRepository.getClientById(savedClient.getId());

    assertTrue(deletedClient.isEmpty());
  }
}
