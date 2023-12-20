package com.pfkdigital.api.repository;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class InvoiceItemRepositoryTest extends BaseTest {
    @Autowired
    private InvoiceItemRepository invoiceItemRepository;
    @Test
    public void InvoiceItemRepository_CreateANewInvoiceItem_ReturnCreatedInvoiceItem(){
        String invoiceItemName = "Website Development";
        InvoiceItem savedInvoiceItem = invoiceItemRepository.save(invoiceItem);

        assertNotNull(savedInvoiceItem);
        assertEquals(invoiceItemName,savedInvoiceItem.getName());
    }

    @Test
    public void InvoiceItemRepository_GetAllInvoiceItems_ReturnInvoiceItems(){
        invoiceItemRepository.save(invoiceItem);

        List<InvoiceItem> testItems = invoiceItemRepository.findAll();

        assertNotNull(testItems);
    }

    @Test
    public void InvoiceItemRepository_GetInvoiceItemById_ReturnInvoiceItem(){
        invoiceItemRepository.save(invoiceItem);

        Optional<InvoiceItem> testItem = invoiceItemRepository.findById(invoiceItem.getId());

        assertTrue(testItem.isPresent());
        assertEquals("Website Development", testItem.get().getName());
    }

    @Test
    public void InvoiceItemRepository_UpdateAnInvoiceItem_ReturnUpdatedInvoiceItem(){
        String invoiceItemName = "Website Development";
        String updatedInvoiceItemName = "Updated Website Development";
        InvoiceItem savedItem = invoiceItemRepository.save(invoiceItem);

        InvoiceItem selectedInvoiceItem = invoiceItemRepository.findById(savedItem.getId()).get();
        selectedInvoiceItem.setName(updatedInvoiceItemName);
        InvoiceItem updatedItem = invoiceItemRepository.save(selectedInvoiceItem);

        assertNotNull(updatedItem);
        assertNotEquals(invoiceItemName,updatedItem.getName());
        assertEquals(updatedInvoiceItemName,updatedItem.getName());
    }

    @Test
    public void InvoiceItemRepository_DeleteInvoiceItemById_DeleteInvoiceItem(){
        invoiceItemRepository.save(invoiceItem);

        InvoiceItem selectedItem = invoiceItemRepository.findById(invoiceItem.getId()).get();
        invoiceItemRepository.delete(selectedItem);
        Optional<InvoiceItem> deletedItem = invoiceItemRepository.findById(invoiceItem.getId());

        assertTrue(deletedItem.isEmpty());
    }

}
