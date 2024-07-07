package com.pfkdigital.api;

import com.pfkdigital.api.dto.*;
import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.model.Address;
import org.junit.jupiter.api.BeforeEach;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class BaseTest {
  protected Invoice invoice;
  protected Client client;
  protected Client mockClient;
  protected ClientDTO clientDTO;
  protected ClientWithInvoicesDTO clientWithInvoicesDTO;
  protected Invoice updatedInvoice;
  protected InvoiceDTO invoiceDTO;
  protected InvoiceWithItemsAndClientDTO invoiceWithItemsAndClientDTO;
  protected InvoiceWithItemsAndClientDTO updatedInvoiceWithClientsAndItemsDTO;
  protected InvoiceItem invoiceItem;
  protected InvoiceItemDTO invoiceItemDTO;
  protected List<InvoiceItem> mockInvoiceItems;

  @BeforeEach
  public void setup() {

    client =
        Client.builder()
            .clientName("Acme Corporation")
            .clientEmail("acme@example.com")
            .clientAddress(
                Address.builder()
                    .street("123 Main Street")
                    .city("Anytown")
                    .postcode("12345")
                    .country("United States")
                    .build())
            .build();

    mockClient =
        Client.builder()
            .clientName("Acme Corporation")
            .clientEmail("acme@example.com")
            .clientAddress(
                Address.builder()
                    .street("123 Main Street")
                    .city("Anytown")
                    .postcode("12345")
                    .country("United States")
                    .build())
            .build();

    invoiceItem =
        InvoiceItem.builder()
            .id(20)
            .name("Website Development")
            .quantity(2)
            .price(BigDecimal.valueOf(750.00))
            .total(BigDecimal.valueOf(1500.00))
            .build();

    InvoiceItem anotherMockItem =
        InvoiceItem.builder()
            .id(2)
            .name("Graphic Design")
            .quantity(3)
            .price(BigDecimal.valueOf(500.00))
            .total(BigDecimal.valueOf(1500.00))
            .build();

    mockInvoiceItems = List.of(invoiceItem, anotherMockItem);

    invoice =
        Invoice.builder()
            .id(1)
            .invoiceReference("INV-001")
            .createdAt(LocalDateTime.now())
            .paymentDue(LocalDateTime.now())
            .description("Web Development Services")
            .paymentTerms(30)
            .invoiceStatus("Unpaid")
            .client(client)
            .total(BigDecimal.valueOf(1500.00))
            .build();
    mockInvoiceItems.forEach(item -> invoice.addInvoiceItem(item));
    client.addInvoice(invoice);

    updatedInvoice =
        Invoice.builder()
            .id(1)
            .invoiceReference("INV-UPDATED")
            .createdAt(LocalDateTime.now())
            .paymentDue(LocalDateTime.now())
            .description("Web Development Services")
            .paymentTerms(30)
            .invoiceStatus("Unpaid")
            .client(client)
            .total(BigDecimal.valueOf(1500.00))
            .build();

    AddressDTO addressDTO =
        AddressDTO.builder()
            .street("123 Main Street")
            .city("Anytown")
            .postcode("12345")
            .country("United States")
            .build();

    clientDTO =
        ClientDTO.builder()
            .id(1)
            .clientName("Acme Corporation")
            .clientEmail("acme@example.com")
            .clientAddress(addressDTO)
            .build();

    invoiceItemDTO =
        InvoiceItemDTO.builder()
            .id(20)
            .name("Web Development")
            .quantity(3)
            .price(BigDecimal.valueOf(500.00))
            .total(BigDecimal.valueOf(1500.00))
            .build();

    InvoiceItemDTO invoiceItemDTO2 =
        InvoiceItemDTO.builder()
            .id(2)
            .name("Graphic Design")
            .quantity(2)
            .price(BigDecimal.valueOf(750.00))
            .total(BigDecimal.valueOf(1500.00))
            .build();

    List<InvoiceItemDTO> invoiceItems = Arrays.asList(invoiceItemDTO, invoiceItemDTO2);

    invoiceDTO =
        InvoiceDTO.builder()
            .id(1)
            .invoiceReference("INV-001")
            .createdAt(LocalDateTime.now())
            .paymentDue(LocalDateTime.now())
            .description("Website Development and Design")
            .paymentTerms(30)
            .invoiceStatus("Pending")
            .total(BigDecimal.valueOf(3000.00))
            .build();

    invoiceWithItemsAndClientDTO =
        InvoiceWithItemsAndClientDTO.builder()
            .id(1)
            .invoiceReference("INV-001")
            .createdAt(LocalDateTime.now())
            .paymentDue(LocalDateTime.now())
            .description("Website Development and Design")
            .paymentTerms(30)
            .invoiceStatus("Pending")
            .total(BigDecimal.valueOf(3000.00))
            .client(clientDTO)
            .invoiceItems(invoiceItems)
            .build();

    updatedInvoiceWithClientsAndItemsDTO =
        InvoiceWithItemsAndClientDTO.builder()
            .id(1)
            .invoiceReference("INV-UPDATED")
            .createdAt(LocalDateTime.now())
            .paymentDue(LocalDateTime.now())
            .description("Website Development and Design")
            .paymentTerms(30)
            .invoiceStatus("Pending")
            .total(BigDecimal.valueOf(3000.00))
            .client(clientDTO)
            .invoiceItems(invoiceItems)
            .build();

    clientWithInvoicesDTO =
        ClientWithInvoicesDTO.builder()
            .id(1)
            .clientName("Acme Corporation")
            .clientEmail("example@example.com")
            .clientAddress(addressDTO)
            .invoices(List.of(invoiceDTO))
            .build();
  }
}
