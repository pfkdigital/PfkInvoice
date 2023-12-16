package com.pfkdigital.api.repository;

import com.pfkdigital.api.BaseTest;

import com.pfkdigital.api.entity.Invoice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.PropertySource;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class InvoiceRepositoryTest extends BaseTest {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Test
    public void InvoiceRepository_CreateANewInvoice_ReturnCreatedInvoice(){
        String savedInvoiceReference = "INV-001";
        Invoice savedInvoice = invoiceRepository.save(invoice);

        assertNotNull(savedInvoice);
        assertEquals(savedInvoiceReference,savedInvoice.getInvoiceReference());
    }

    @Test
    public void InvoiceRepository_GetAllInvoices_ReturnAListOfAllInvoices(){
        String savedInvoiceReference = "INV-001";
        invoiceRepository.save(invoice);
        List<Invoice> invoiceList = invoiceRepository.findAll();

        assertEquals(1,invoiceList.size());
        assertNotNull(invoiceList);
        assertEquals(savedInvoiceReference,invoiceList.get(0).getInvoiceReference());
    }

    @Test
    public void InvoiceRepository_GetInvoiceWithClientAndItemsById_ReturnInvoice(){
        String savedInvoiceReference = "INV-001";
        String clientName = "Acme Corporation";

        Invoice savedInvoice = invoiceRepository.save(invoice);
        Optional<Invoice> selectedInvoice = invoiceRepository.findInvoiceWithClientAndItemsById(savedInvoice.getId());

        assertTrue(selectedInvoice.isPresent());
        assertEquals(savedInvoiceReference,selectedInvoice.get().getInvoiceReference());
        assertEquals(clientName, selectedInvoice.get().getClient().getClientName());
        assertEquals(2, selectedInvoice.get().getInvoiceItems().size());
    }

    @Test
    public void InvoiceRepository_UpdateAnInvoice_ReturnUpdatedInvoice(){
        String savedInvoiceReference = "INV-001";
        String updatedInvoiceReference = "INV-002";
        Invoice savedInvoice = invoiceRepository.save(invoice);
        Invoice selectedInvoice = invoiceRepository.findInvoiceWithClientAndItemsById(savedInvoice.getId()).get();

        selectedInvoice.setInvoiceReference(updatedInvoiceReference);
        Invoice updatedInvoice = invoiceRepository.save(selectedInvoice);

        assertNotNull(updatedInvoice);
        assertEquals(updatedInvoiceReference,updatedInvoice.getInvoiceReference());
        assertNotEquals(savedInvoiceReference, updatedInvoice.getInvoiceReference());
    }

    @Test
    public void InvoiceRepository_DeleteAnInvoiceById_InvoiceRemoved(){
        Invoice savedInvoice = invoiceRepository.save(invoice);

        invoiceRepository.delete(savedInvoice);
        Optional<Invoice> deletedInvoice = invoiceRepository.findById(savedInvoice.getId());

        assertTrue(deletedInvoice.isEmpty());
    }
}
