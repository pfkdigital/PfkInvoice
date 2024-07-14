package com.pfkdigital.api.integration;

import com.pfkdigital.api.dto.*;
import com.pfkdigital.api.model.ApiError;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
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

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class InvoiceIntegrationTest {
  @Container
  public static PostgreSQLContainer<?> container = new PostgreSQLContainer<>("postgres:15");

  TestRestTemplate restTemplate = new TestRestTemplate();

  @LocalServerPort private Integer port;

  private InvoiceDetailDTO invoiceDetailDTO;
  private InvoiceDetailDTO updatedInvoiceDetailDTO;

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

  @BeforeEach
    public void setUp() {
        invoiceDetailDTO = InvoiceDetailDTO.builder()
                .invoiceReference("INV-001")
                .createdAt(new Date())
                .paymentDue(new Date())
                .description("Test Invoice")
                .paymentTerms(30)
                .invoiceStatus("Draft")
                .total(BigDecimal.valueOf(10000))
                .client(ClientDTO.builder().id(1).clientName("Acme Corporation").build())
                .invoiceItems(
                        List.of(
                                InvoiceItemDTO.builder()
                                        .name("Test Item")
                                        .quantity(3)
                                        .price(BigDecimal.TEN)
                                        .total(BigDecimal.valueOf(30))
                                        .build()))
                .build();
        updatedInvoiceDetailDTO = InvoiceDetailDTO.builder()
                .invoiceReference("INV-UPDATED")
                .createdAt(new Date())
                .paymentDue(new Date())
                .description("Test Invoice")
                .paymentTerms(30)
                .invoiceStatus("Draft")
                .total(BigDecimal.valueOf(10000))
                .client(ClientDTO.builder().id(1).clientName("Acme Corporation").build())
                .invoiceItems(
                        List.of(
                                InvoiceItemDTO.builder()
                                        .name("Test Item")
                                        .quantity(3)
                                        .price(BigDecimal.TEN)
                                        .total(BigDecimal.valueOf(30))
                                        .build()))
                .build();
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

    InvoiceDetailDTO createdInvoice =
        restTemplate.postForObject(
            baseUrl, invoiceDetailDTO, InvoiceDetailDTO.class);

    assertNotNull(createdInvoice);
    assertEquals(invoiceReference, createdInvoice.getInvoiceReference());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetAllInvoices_ReturnListInvoiceDto() {
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices";

    InvoiceDTO[] allInvoices = restTemplate.getForObject(baseUrl, InvoiceDTO[].class);

    assertNotNull(allInvoices);
    assertEquals(20, allInvoices.length);
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetInvoiceById_ReturnInvoiceWithClientsAndItemsDTO() {
    int invoiceId = 1;
    String invoiceReference = "INV-001";
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices/" + invoiceId;

    InvoiceDetailDTO testInvoice =
        restTemplate.getForObject(baseUrl, InvoiceDetailDTO.class);

    assertNotNull(testInvoice);
    assertEquals(invoiceReference, testInvoice.getInvoiceReference());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetInvoiceTotalSums_ReturnSum() {
    String expectedTotal = "46.4K";
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices/total";

    CurrencyDTO actualTotalSum =
            restTemplate.getForObject(baseUrl, CurrencyDTO.class);

    assertNotNull(actualTotalSum);
    assertEquals(expectedTotal, actualTotalSum.getStatus());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetUnpaidInvoiceTotalSums_ReturnSum() {
    String expectedTotal = "22.3K";
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices/unpaid/total";

    CurrencyDTO actualTotalSum =
            restTemplate.getForObject(baseUrl, CurrencyDTO.class);

    assertNotNull(actualTotalSum);
    assertEquals(expectedTotal, actualTotalSum.getStatus());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_GetInvoiceCount_ReturnCount()  {
    long expectedInvoiceCount = 20;
    String baseUrl = "http://localhost:+" + port + "/api/v1/invoices/count";

    CountDTO actualInvoiceCount =
            restTemplate.getForObject(baseUrl, CountDTO.class);

    assertNotNull(actualInvoiceCount);
    assertEquals(expectedInvoiceCount, actualInvoiceCount.getStatus());
  }

  @Test
  public void InvoiceIntegration_GetInvoiceById_ThrowsInvoiceNotFoundException() {
    int invoiceId = 100;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/" + invoiceId;
    HttpEntity<String> entity = new HttpEntity<>(null);

    ResponseEntity<ApiError> response = restTemplate.exchange(baseUrl, HttpMethod.GET,entity,ApiError.class);
    System.out.println(response);
    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    assertEquals(
        "Invoice of id 100 is not found", Objects.requireNonNull(response.getBody()).getMessage());
  }

  @Test
  @Sql({"/schema.sql", "/data.sql"})
  public void InvoiceIntegration_UpdateInvoice_ReturnUpdatedInvoiceDTO() {
    int invoiceId = 1;
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/" + invoiceId;
    String invoiceReference = "INV-UPDATED";

    restTemplate.put(
        baseUrl, updatedInvoiceDetailDTO, InvoiceDetailDTO.class);

    InvoiceDetailDTO testInvoice =
        restTemplate.getForObject(baseUrl, InvoiceDetailDTO.class);

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
    assertEquals(20, allInvoices.length);
    assertEquals(19, newInvoices.length);
  }

  @Test
  @Sql({"/schema.sql","/data.sql"})
  void InvoiceIntegration_GetRevenueByMonth_ReturnGraphDataDTOList() {
    String baseUrl = "http://localhost:" + port + "/api/v1/invoices/graph";

    GraphDataDTO[] graphDataDTOList = restTemplate.getForObject(baseUrl, GraphDataDTO[].class);

    System.out.println(Arrays.toString(graphDataDTOList));

    assertNotNull(graphDataDTOList);
    assertEquals(8, graphDataDTOList.length);
  }
}
