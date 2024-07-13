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
  void ClientRepository_GetAllClients_ReturnAListOfClients() {
    String clientName = "Acme Corporation";
    String clientName1 = "Test Corporation";
    Client client = Client.builder().clientName(clientName).build();
    Client client1 = Client.builder().clientName(clientName1).build();

    clientRepository.saveAll(List.of(client, client1));

    List<Client> clients = clientRepository.findAllByOrderByIdAsc();

    assertNotNull(clients);
    assertEquals(2, clients.size());
    assertTrue(clients.get(0).getId() < clients.get(1).getId());
  }

  @Test
  void CreateRepository_GetLatest11Clients_ReturnLatestClients() {
    for (int i = 0; i < 13; i++) {
      clientRepository.save(Client.builder().clientName("Acme Corporation " + i).build());
    }

    List<Client> clients = clientRepository.findLast11OrderByDesc();

    assertNotNull(clients);
    assertEquals(11, clients.size());
    assertTrue(clients.get(0).getId() > clients.get(1).getId());
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
}
