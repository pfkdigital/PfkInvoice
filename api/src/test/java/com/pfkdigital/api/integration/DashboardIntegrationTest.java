package com.pfkdigital.api.integration;

import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.GraphDataDTO;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DashboardIntegrationTest {
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
    @Sql({"/schema.sql", "/data.sql"})
    void DashboardIntegrationTest_GetInvoicesCount_ReturnInvoicesCountDTO() {
        String expectedLabel = "Invoices";
        long expectedStatus = 35;

        ResponseEntity<CountDTO> response = restTemplate.getForEntity("http://localhost:" + port + "/api/v1/dashboard/invoices/count", CountDTO.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedLabel, Objects.requireNonNull(response.getBody()).getLabel());
        assertEquals(expectedStatus, response.getBody().getStatus());
    }

    @Test
    @Sql({"/schema.sql", "/data.sql"})
    void DashboardIntegrationTest_GetClientsCount_ReturnClientsCountDTO() {
        String expectedLabel = "Clients";
        long expectedStatus = 25;

        ResponseEntity<CountDTO> response = restTemplate.getForEntity("http://localhost:" + port + "/api/v1/dashboard/clients/count", CountDTO.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedLabel, Objects.requireNonNull(response.getBody()).getLabel());
        assertEquals(expectedStatus, response.getBody().getStatus());
    }

    @Test
    @Sql({"/schema.sql", "/data.sql"})
    void DashboardIntegrationTest_GetAllInvoiceTotalSum_ReturnCurrencyDTO() {
        String expectedLabel = "Revenue";
        String expectedStatus = "89.7K";

        ResponseEntity<CurrencyDTO> response = restTemplate.getForEntity("http://localhost:" + port + "/api/v1/dashboard/invoices/total-sum", CurrencyDTO.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedLabel, Objects.requireNonNull(response.getBody()).getLabel());
        assertEquals(expectedStatus, response.getBody().getStatus());
    }

    @Test
    @Sql({"/schema.sql", "/data.sql"})
    void DashboardIntegrationTest_GetAllInvoiceTotalSumUnpaid_ReturnCurrencyDTO() {
        String expectedLabel = "Unpaid Revenue";
        String expectedStatus = "18.5K";

        ResponseEntity<CurrencyDTO> response = restTemplate.getForEntity("http://localhost:" + port + "/api/v1/dashboard/invoices/total-sum/unpaid", CurrencyDTO.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedLabel, Objects.requireNonNull(response.getBody()).getLabel());
        assertEquals(expectedStatus, response.getBody().getStatus());
    }

    @Test
    @Sql({"/schema.sql", "/data.sql"})
    void DashboardIntegrationTest_GetRevenueByMonth_ReturnListOfGraphDataDTO() {
        String expectedMonth = "February";
        BigDecimal expectedValue = BigDecimal.valueOf(1500).setScale(2, RoundingMode.DOWN);

        ResponseEntity<GraphDataDTO[]> response = restTemplate.getForEntity("http://localhost:" + port + "/api/v1/dashboard/revenue/monthly", GraphDataDTO[].class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedMonth, Objects.requireNonNull(Objects.requireNonNull(response.getBody())[0].getKey()));
        assertEquals(expectedValue, response.getBody()[0].getValue());
    }
}
