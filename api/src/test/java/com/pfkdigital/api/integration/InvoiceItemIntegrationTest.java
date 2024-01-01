package com.pfkdigital.api.integration;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class InvoiceItemIntegrationTest extends BaseTest {
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
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceItemIntegration_CreateAnInvoiceItem_ReturnCreatedInvoiceItem() {
    int invoiceId = 1;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/" + invoiceId + "/items";
    String itemName = "Web Development";

    InvoiceItemDTO newInvoiceItem =
        restTemplate.postForObject(baseUrl, invoiceItemDTO, InvoiceItemDTO.class);

    assertNotNull(newInvoiceItem);
    assertEquals(itemName, newInvoiceItem.getName());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceItemIntegration_UpdateAnInvoiceItem_ReturnCreatedInvoiceItem() {
    int invoiceItemId = 1;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/" + "items/" + invoiceItemId;
    String itemUrl = "http://localhost:" + port + "/api/v1/invoices" + "/items/" + invoiceItemId;
    String itemName = "Web Development";

    restTemplate.put(baseUrl, invoiceItemDTO, InvoiceItemDTO.class);

    InvoiceItemDTO updatedItem = restTemplate.getForObject(itemUrl, InvoiceItemDTO.class);

    assertNotNull(updatedItem);
    assertEquals(itemName, updatedItem.getName());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceItemIntegration_DeleteAnInvoiceItemById_ItemDeleted() {
    int invoiceId = 1;
    int invoiceItemId = 1;
    String allItemsUrl = "http://localhost:" + port + "/api/v1/invoices/items";
    String deleteUrl =
        "http://localhost:" + port + "/api/v1/invoices/" + invoiceId + "/items/" + invoiceItemId;

    InvoiceItemDTO[] initialList = restTemplate.getForObject(allItemsUrl, InvoiceItemDTO[].class);
    restTemplate.delete(deleteUrl);
    InvoiceItemDTO[] finalList = restTemplate.getForObject(allItemsUrl, InvoiceItemDTO[].class);

    assertNotNull(initialList);
    assertNotNull(finalList);
    assertEquals(15, initialList.length);
    assertEquals(14, finalList.length);
  }

  @AfterAll
  public static void afterAll() {
    container.stop();
  }
}
