package com.pfkdigital.api.repository;

import com.pfkdigital.api.entity.Client;

import com.pfkdigital.api.entity.Invoice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class ClientRepositoryTest {

  @Autowired private ClientRepository clientRepository;

  @Test
  void ClientRepository_CreateClient_ReturnNewClient() {
    String clientName = "Acme Corporation";
    Client client = Client.builder().clientName(clientName).build();

    Client savedClient = clientRepository.save(client);

    assertNotNull(savedClient);
    assertEquals(clientName, savedClient.getClientName());
  }

  @Test
  void ClientRepository_GetAllClients_ReturnAListOfClients() {
    String clientName = "Acme Corporation";
    String clientName1 = "Test Corporation";
    Client client = Client.builder().clientName(clientName).build();
    Client client1 = Client.builder().clientName(clientName1).build();

    clientRepository.saveAll(List.of(client, client1));

    List<Client> clients = clientRepository.findAllByOrderByIdAsc();

    assertNotNull(clients);
    assertEquals(2, clients.size());
    assertEquals(clientName, clients.get(0).getClientName());
    assertEquals(clientName1, clients.get(1).getClientName());
  }

  @Test
  void CreateRepository_GetLatestClient_ReturnLatestClient() {
    String clientName = "Acme Corporation";
    String clientName1 = "Test Corporation";
    Client client = Client.builder().clientName(clientName).id(1).build();
    Client client1 = Client.builder().clientName(clientName1).id(2).build();

    clientRepository.saveAll(List.of(client, client1));

    List<Client> latestClients = clientRepository.findLast11OrderByDesc();

    assertNotNull(latestClients);
    assertTrue(latestClients.get(0).getId() > latestClients.get(1).getId());
  }

  @Test
  void ClientRepository_GetClientById_ReturnAClient() {
    String clientName = "Acme Corporation";
    String invoiceReference = "INV-001";
    Client mockClient = Client.builder().clientName(clientName).build();
    Invoice mockInvoice = Invoice.builder().invoiceReference(invoiceReference).build();
    mockClient.setInvoices(List.of(mockInvoice));

    Client savedClient = clientRepository.save(mockClient);

    Optional<Client> selectedClient =
        clientRepository.getClientWithInvoicesById(savedClient.getId());

    assertTrue(selectedClient.isPresent());
    assertEquals(selectedClient.get().getId(), savedClient.getId());
    assertEquals(clientName, selectedClient.get().getClientName());
    assertEquals(invoiceReference, selectedClient.get().getInvoices().get(0).getInvoiceReference());
  }

  @Test
  void ClientRepository_GetClientCount_ReturnCount() {
    String clientName = "Acme Corporation";
    String clientName1 = "Test Corporation";
    Client client = Client.builder().clientName(clientName).build();
    Client client1 = Client.builder().clientName(clientName1).build();

    clientRepository.saveAll(List.of(client, client1));

    Long clientCount = clientRepository.count();

    assertNotNull(clientCount);
    assertEquals(2, clientCount);
  }

  @Test
  void ClientRepository_UpdateClient_ReturnUpdatedClient() {
    String clientName = "Acme Corporation";
    String updatedClientName = "Updated Corporation";
    Client client = Client.builder().clientName(clientName).build();
    Client savedClient = clientRepository.save(client);
    savedClient.setClientName(updatedClientName);

    Client updatedClient = clientRepository.save(savedClient);

    assertNotNull(updatedClient);
    assertEquals(updatedClientName, updatedClient.getClientName());
    assertNotEquals(clientName, updatedClient.getClientName());
  }
}
