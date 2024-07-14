package com.pfkdigital.api.integration;

import com.pfkdigital.api.dto.AddressDTO;
import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.model.ApiError;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class ClientIntegrationTest {
  @Container
  public static PostgreSQLContainer<?> container = new PostgreSQLContainer<>("postgres:15");

  TestRestTemplate restTemplate = new TestRestTemplate();

  @LocalServerPort private Integer port;

  @BeforeAll
  public static void beforeAll() {
    container.start();
  }

  public static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", container::getJdbcUrl);
    registry.add("spring.datasource.username", container::getUsername);
    registry.add("spring.datasource.password", container::getPassword);
  }

  @AfterAll
  public static void afterAll() {
    container.stop();
  }

  @Test
  public void ClientIntegration_CreateClient_ReturnClientDTO() {
    String baseUrl = "http://localhost:" + port + "/api/v1/clients";
    String clientName = "Acme Corporation";

    AddressDTO addressDTO =
            AddressDTO.builder()
                    .street("123 Street")
                    .city("Test City")
                    .postcode("test123")
                    .country("United Kingdom")
                    .build();

    ClientDTO clientDTO =
            ClientDTO.builder()
                    .clientName("Acme Corporation")
                    .clientEmail("test@test.com")
                    .clientAddress(addressDTO)
                    .build();

    ClientDTO newClient = restTemplate.postForObject(baseUrl, clientDTO, ClientDTO.class);

    assertNotNull(newClient);
    assertEquals(clientName, newClient.getClientName());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void ClientIntegration_GetAllClients_ReturnClientDTOList() {
    String baseUrl = "http://localhost:" + port + "/api/v1/clients";

    ClientDTO[] clientDTOList = restTemplate.getForObject(baseUrl, ClientDTO[].class);

    assertNotNull(clientDTOList);
    assertEquals(15, clientDTOList.length);
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void ClientIntegration_GetClientById_ReturnClientDTOWithInvoices() {
    int clientID = 1;
    String clientName = "ABC Company Inc.";

    String baseUrl = "http://localhost:" + port + "/api/v1/clients/" + clientID;

    ClientDTO selectedClient = restTemplate.getForObject(baseUrl, ClientDTO.class);

    assertNotNull(selectedClient);
    assertEquals(clientName, selectedClient.getClientName());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void ClientIntegration_GetClientById_ThrowInvoiceNotFoundException() {
    int clientID = 100;
    String notFoundMessage = "Client of id " + clientID + " was not found";
    String baseUrl = "http://localhost:" + port + "/api/v1/clients/" + clientID;
    HttpEntity<String> entity = new HttpEntity<>(null);

    ResponseEntity<ApiError> response =
        restTemplate.exchange(baseUrl, HttpMethod.GET, entity, ApiError.class);
    System.out.println(response);
    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertEquals(notFoundMessage, Objects.requireNonNull(response.getBody()).getMessage());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void ClientIntegration_GetClientCount_ReturnClientCount() {
    long clientCountExpected = 15;

    String baseUrl = "http://localhost:" + port + "/api/v1/clients/count";

    CountDTO clientCount = restTemplate.getForObject(baseUrl, CountDTO.class);

    assertNotNull(clientCount);
    assertEquals(clientCountExpected, clientCount.getStatus());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void ClientIntegration_UpdateClientById_ReturnUpdatedClientDTO() {
    int clientID = 1;
    String clientName = "Acme Corporation Updated";
    String baseUrl = "http://localhost:" + port + "/api/v1/clients/" + clientID;

    ClientDTO updatedClientDTO =
            ClientDTO.builder()
                    .id(1)
                    .clientName("Acme Corporation Updated")
                    .clientEmail("test@test.com")
                    .clientAddress(
                            AddressDTO.builder()
                                    .street("123 Street")
                                    .city("Test City")
                                    .postcode("test123")
                                    .country("United Kingdom")
                                    .build())
                    .build();

    restTemplate.put(baseUrl, updatedClientDTO, ClientDTO.class);

    ClientDTO selectedClient = restTemplate.getForObject(baseUrl, ClientDTO.class);

    assertNotNull(selectedClient);
    assertEquals(clientName, selectedClient.getClientName());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void ClientIntegration_DeleteClientById_ClientDeleted() {
    int clientID = 1;
    String baseUrl = "http://localhost:" + port + "/api/v1/clients";
    String clientUrl = "http://localhost:" + port + "/api/v1/clients/" + clientID;

    ClientDTO[] initialClients = restTemplate.getForObject(baseUrl, ClientDTO[].class);

    restTemplate.delete(clientUrl, String.class);

    ClientDTO[] finalClients = restTemplate.getForObject(baseUrl, ClientDTO[].class);

    assertNotNull(initialClients);
    assertNotNull(finalClients);
    assertEquals(15, initialClients.length);
    assertEquals(14, finalClients.length);
  }
}
