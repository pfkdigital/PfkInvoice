package com.pfkdigital.api.repository;

import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class InvoiceRepositoryTest {

  @Autowired private ClientRepository clientRepository;
  @Autowired private InvoiceRepository invoiceRepository;

  @Test
  void InvoiceRepository_GetAllInvoicesOrderByIdAsc_ReturnListOfInvoices() {
    Invoice invoice1 = Invoice.builder().invoiceReference("INV-001").build();
    Invoice invoice2 = Invoice.builder().invoiceReference("INV-002").build();

    invoiceRepository.save(invoice1);
    invoiceRepository.save(invoice2);

    List<Invoice> invoiceList = invoiceRepository.findAllByOrderByIdAsc();

    assertNotNull(invoiceList);
    assertEquals(2, invoiceList.size());
    assertTrue(invoiceList.get(0).getId() < invoiceList.get(1).getId());
  }

  @Test
  void InvoiceRepository_GetLast11Invoices_ReturnListOfInvoice() {
    for(int i = 0; i < 13; i++) {
      invoiceRepository.save(Invoice.builder().invoiceReference("INV-00" + i).build());
    }
    List<Invoice> invoiceList = invoiceRepository.findLast11OrderByDesc();

    assertNotNull(invoiceList);
    assertEquals(11, invoiceList.size());
    assertTrue(invoiceList.get(0).getId() > invoiceList.get(1).getId());
  }

  @Test
  void InvoiceRepository_GetInvoiceDetailById_ReturnInvoice() {
    Client client = Client.builder().clientName("Acme Corporation").build();
    Client savedClient = clientRepository.save(client);
    Invoice invoice =
        Invoice.builder().id(1).invoiceReference("INV-001").client(savedClient).build();
    InvoiceItem invoiceItem =
        InvoiceItem.builder().name("Item 1").quantity(1).price(BigDecimal.valueOf(500.00)).build();
    invoice.addInvoiceItem(invoiceItem);
    invoiceRepository.save(invoice);

    Optional<Invoice> selectedInvoice = invoiceRepository.findInvoiceDetailById(invoice.getId());

    assertTrue(selectedInvoice.isPresent());
    assertEquals("INV-001", selectedInvoice.get().getInvoiceReference());
    assertEquals("Item 1", selectedInvoice.get().getInvoiceItems().get(0).getName());
    assertEquals("Acme Corporation", selectedInvoice.get().getClient().getClientName());
  }

  @Test
  void InvoiceRepository_GetInvoiceTotalSums_ReturnSum() {
    BigDecimal expectedTotal = BigDecimal.valueOf(500).setScale(2, RoundingMode.DOWN);
    Invoice invoice =
        Invoice.builder().invoiceStatus("Paid").total(BigDecimal.valueOf(500.00)).build();

    invoiceRepository.save(invoice);

    BigDecimal actualTotal = invoiceRepository.getSumOfAllTotalInvoices();

    assertNotNull(actualTotal);
    assertEquals(expectedTotal, actualTotal);
  }

  @Test
  void InvoiceRepository_GetUnpaidInvoiceTotalSums_ReturnSum() {
    BigDecimal expectedTotal = BigDecimal.valueOf(500).setScale(2, RoundingMode.DOWN);
    Invoice invoice =
        Invoice.builder().invoiceStatus("Unpaid").total(BigDecimal.valueOf(500.00)).build();

    invoiceRepository.save(invoice);

    BigDecimal actualTotal = invoiceRepository.getSumOfAllTotalInvoicesUnpaid();

    assertNotNull(actualTotal);
    assertEquals(expectedTotal, actualTotal);
  }

  @Test
  void InvoiceRepository_GetInvoiceCount_ReturnCount() {
    Invoice invoice1 = Invoice.builder().invoiceReference("INV-001").build();
    Invoice invoice2 = Invoice.builder().invoiceReference("INV-002").build();

    invoiceRepository.save(invoice1);
    invoiceRepository.save(invoice2);

    long invoiceCount = invoiceRepository.count();

    assertEquals(2, invoiceCount);
  }
}
