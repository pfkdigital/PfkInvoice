package com.pfkdigital.api.service;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceItemNotFoundException;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceItemMapper;
import com.pfkdigital.api.repository.InvoiceItemRepository;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.impl.InvoiceItemServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class InvoiceItemServiceTest extends BaseTest {
    @Mock
    private InvoiceItemRepository invoiceItemRepository;
    @Mock
    private InvoiceRepository invoiceRepository;
    @Mock
    private InvoiceItemMapper invoiceItemMapper;
    @InjectMocks
    private InvoiceItemServiceImpl invoiceItemService;

    @Test
    public void InvoiceItemService_CreateAnInvoiceItem_ReturnNewInvoiceItem(){
        int invoiceId = 1;
        String invoiceItemName = "Web Development";

        when(invoiceItemMapper.invoiceItemDTOToInvoiceItem(any(InvoiceItemDTO.class))).thenReturn(invoiceItem);
        when(invoiceRepository.findById(anyInt())).thenReturn(Optional.of(invoice));
        when(invoiceItemRepository.save(any(InvoiceItem.class))).thenReturn(invoiceItem);
        when(invoiceItemMapper.invoiceItemToInvoiceItemDTO(invoiceItem)).thenReturn(invoiceItemDTO);

        InvoiceItemDTO savedInvoiceItem = invoiceItemService.createInvoiceItem(invoiceItemDTO,invoiceId);

        assertNotNull(savedInvoiceItem);
        assertEquals(invoiceItemName,savedInvoiceItem.getName());

        verify(invoiceRepository).findById(anyInt());
        verify(invoiceItemRepository).save(any(InvoiceItem.class));
    }

    @Test
    public void InvoiceItemService_GetAllItems_ReturnItemList(){
        when(invoiceItemRepository.findAll()).thenReturn(List.of(invoiceItem));
        when(invoiceItemMapper.invoiceItemToInvoiceItemDTO(any(InvoiceItem.class))).thenReturn(invoiceItemDTO);

        List<InvoiceItemDTO> testItems = invoiceItemService.getAllInvoiceItem();

        assertNotNull(testItems);
        assertEquals(1,testItems.size());
    }

    @Test
    public void InvoiceItemService_GetInvoiceItemById_ReturnItem(){
        int invoiceItemId = 1;
        String invoiceItemName = "Web Development";

        when(invoiceItemRepository.findById(anyInt())).thenReturn(Optional.of(invoiceItem));
        when(invoiceItemMapper.invoiceItemToInvoiceItemDTO(any(InvoiceItem.class))).thenReturn(invoiceItemDTO);

        InvoiceItemDTO testItem = invoiceItemService.getInvoiceItemById(invoiceItemId);

        assertNotNull(testItem);
        assertEquals(invoiceItemName,testItem.getName());
    }

    @Test
    public void InvoiceItemService_CreateAnInvoiceItem_ThrowInvoiceNotFoundException(){
        int invoiceId = 1;

        when(invoiceRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(InvoiceNotFoundException.class, () -> {
            invoiceItemService.createInvoiceItem(invoiceItemDTO, invoiceId);
        });

        verify(invoiceRepository).findById(anyInt());
    }

    @Test
    public void InvoiceItemService_UpdateInvoiceItem_ReturnString(){
        int invoiceItemId = 1;
        when(invoiceItemMapper.invoiceItemDTOToInvoiceItem(any(InvoiceItemDTO.class))).thenReturn(invoiceItem);
        when(invoiceItemRepository.findById(anyInt())).thenReturn(Optional.of(invoiceItem));
        when(invoiceItemRepository.save(any(InvoiceItem.class))).thenReturn(invoiceItem);

        String confirmationMessage = invoiceItemService.updateInvoiceItem(invoiceItemDTO,invoiceItemId);

        assertNotNull(confirmationMessage);
        assertEquals(confirmationMessage,"Invoice item of id " + invoiceItemId + " was updated");

        verify(invoiceItemRepository).findById(anyInt());
        verify(invoiceItemRepository).save(any(InvoiceItem.class));
    }

    @Test
    public void InvoiceItemService_UpdateAnInvoiceItem_ThrowInvoiceNotFoundException(){
        int invoiceId = 1;

        when(invoiceItemRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(InvoiceItemNotFoundException.class, () -> {
            invoiceItemService.updateInvoiceItem(invoiceItemDTO, invoiceId);
        });

        verify(invoiceItemRepository).findById(anyInt());
    }

    @Test
    public void InvoiceItemService_DeleteInvoice_ReturnString(){
        int invoiceItemId = 1;
        String deletedConfirmation = "Invoice item of id " + invoiceItemId + " was deleted";

        when(invoiceItemRepository.findById(anyInt())).thenReturn(Optional.of(invoiceItem));
        doNothing().when(invoiceItemRepository).delete(invoiceItem);

        String confirmationMessage = invoiceItemService.deleteInvoiceItem(invoiceItemId);

        assertEquals(confirmationMessage,deletedConfirmation);
        verify(invoiceItemRepository).findById(anyInt());
        verify(invoiceItemRepository).delete(any(InvoiceItem.class));
    }
}
