package com.pfkdigital.api.integration;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;
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

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class InvoiceIntegrationTest extends BaseTest {
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

  @Test
  public void InvoiceIntegration_SetUpDatabase() {
    assertTrue(container.isCreated());
    assertTrue(container.isRunning());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_CreateInvoice_ReturnInvoiceDTO() {
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices";
    String invoiceReference = "INV-001";

    InvoiceWithItemsAndClientDTO createdInvoice =
        restTemplate.postForObject(
            baseUrl, invoiceWithItemsAndClientDTO, InvoiceWithItemsAndClientDTO.class);

    assertNotNull(createdInvoice);
    assertEquals(invoiceReference, createdInvoice.getInvoiceReference());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetAllInvoices_ReturnListInvoiceDto() {
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices";

    InvoiceDTO[] allInvoices = restTemplate.getForObject(baseUrl, InvoiceDTO[].class);

    assertNotNull(allInvoices);
    assertEquals(15, allInvoices.length);
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetInvoiceById_ReturnInvoiceWithClientsAndItemsDTO() {
    int invoiceId = 1;
    String invoiceReference = "INV-001";
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices/" + invoiceId;

    InvoiceWithItemsAndClientDTO testInvoice =
        restTemplate.getForObject(baseUrl, InvoiceWithItemsAndClientDTO.class);

    assertNotNull(testInvoice);
    assertEquals(invoiceReference, testInvoice.getInvoiceReference());
  }

  @Test
  public void InvoiceIntegration_GetInvoiceById_ThrowsInvoiceNotFoundException() {
    int invoiceId = 100;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/" + invoiceId;
    HttpEntity<String> entity = new HttpEntity<>(null);

    ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.GET,entity,String.class);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertEquals(
        "Invoice of id 100 is not found", response.getBody());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_UpdateInvoice_ReturnUpdatedInvoiceDTO() {
    int invoiceId = 1;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/" + invoiceId;
    String invoiceReference = "INV-UPDATED";

    restTemplate.put(
        baseUrl, updatedInvoiceWithClientsAndItemsDTO, InvoiceWithItemsAndClientDTO.class);

    InvoiceWithItemsAndClientDTO testInvoice =
        restTemplate.getForObject(baseUrl, InvoiceWithItemsAndClientDTO.class);

    assertNotNull(testInvoice);
    assertEquals(invoiceReference, testInvoice.getInvoiceReference());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_DeleteInvoiceById_ReturnInvoiceWithClientsAndItemsDTO() {
    int invoiceId = 1;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices";
    String deleteBaseUrl = "http://localhost:" + port + "/api/v1/invoices/" + invoiceId;

    InvoiceDTO[] allInvoices = restTemplate.getForObject(baseUrl, InvoiceDTO[].class);

    restTemplate.delete(deleteBaseUrl, String.class);

    InvoiceDTO[] newInvoices = restTemplate.getForObject(baseUrl, InvoiceDTO[].class);

    assertNotNull(allInvoices);
    assertNotNull(newInvoices);
    assertEquals(15, allInvoices.length);
    assertEquals(14, newInvoices.length);
  }

  @AfterAll
  public static void afterAll() {
    container.stop();
  }
}
