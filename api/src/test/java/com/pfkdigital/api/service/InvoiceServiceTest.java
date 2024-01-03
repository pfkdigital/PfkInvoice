package com.pfkdigital.api.service;

import com.pfkdigital.api.BaseTest;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.impl.InvoiceServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class InvoiceServiceTest extends BaseTest {
  @Mock private InvoiceRepository invoiceRepository;
  @Mock private InvoiceMapper invoiceMapper;
  @InjectMocks private InvoiceServiceImpl invoiceService;

  @Test
  public void InvoiceService_CreateNewInvoice_ReturnNewInvoiceDTO() {
    String savedInvoiceReference = "INV-001";
    when(invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(
            Mockito.any(InvoiceWithItemsAndClientDTO.class)))
        .thenReturn(invoice);
    when(invoiceRepository.save(invoice)).thenReturn(invoice);
    when(invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class)))
        .thenReturn(invoiceWithItemsAndClientDTO);

    InvoiceWithItemsAndClientDTO savedInvoice =
        invoiceService.createInvoice(invoiceWithItemsAndClientDTO);

    assertNotNull(savedInvoice);
    assertEquals(savedInvoiceReference, savedInvoice.getInvoiceReference());
    verify(invoiceRepository, times(1)).save(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_GetAllInvoices_ReturnInvoiceDTOList() {
    String savedInvoiceReference = "INV-001";
    when(invoiceRepository.findAll()).thenReturn(List.of(invoice));
    when(invoiceMapper.invoiceToInvoiceDTO(Mockito.any(Invoice.class))).thenReturn(invoiceDTO);

    List<InvoiceDTO> invoiceDTOS = invoiceService.getAllInvoices();

    assertNotNull(invoiceDTOS);
    assertEquals(savedInvoiceReference, invoiceDTOS.get(0).getInvoiceReference());

    verify(invoiceRepository).findAll();
    verify(invoiceMapper, times(1)).invoiceToInvoiceDTO(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_GetInvoiceById_ReturnInvoiceWithItemsAndClientDTO() {
    String savedInvoiceReference = "INV-001";
    when(invoiceRepository.findInvoiceWithClientAndItemsById(Mockito.anyInt()))
        .thenReturn(Optional.of(invoice));
    when(invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class)))
        .thenReturn(invoiceWithItemsAndClientDTO);

    InvoiceWithItemsAndClientDTO invoiceDTO = invoiceService.getAnInvoiceById(Mockito.anyInt());

    assertNotNull(invoiceDTO);
    assertEquals(savedInvoiceReference, invoiceDTO.getInvoiceReference());

    verify(invoiceRepository).findInvoiceWithClientAndItemsById(Mockito.anyInt());
    verify(invoiceMapper, times(1))
        .invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_GetInvoiceTotalSums_ReturnSum(){
    BigDecimal expectedTotalSum = BigDecimal.valueOf(1500.00);
    when(invoiceRepository.getSumOfAllTotalInvoices()).thenReturn(expectedTotalSum);

    BigDecimal actualTotalSum = invoiceService.getAllInvoiceTotalSum();

    assertNotNull(actualTotalSum);
    assertEquals(expectedTotalSum,actualTotalSum);

    verify(invoiceRepository).getSumOfAllTotalInvoices();
  }

  @Test
  public void InvoiceService_GGetUnpaidInvoiceTotalSums_ReturnSum(){
    BigDecimal expectedTotalSum = BigDecimal.valueOf(1500.00);
    when(invoiceRepository.getSumOfAllTotalInvoicesUnpaid()).thenReturn(expectedTotalSum);

    BigDecimal actualTotalSum = invoiceService.getAllInvoiceTotalSumUnpaid();

    assertNotNull(actualTotalSum);
    assertEquals(expectedTotalSum,actualTotalSum);

    verify(invoiceRepository).getSumOfAllTotalInvoicesUnpaid();
  }

  @Test
  public void InvoiceService_GetInvoiceCount_ReturnCount() {
    long expectedInvoiceCount = 1;

    when(invoiceRepository.count()).thenReturn(expectedInvoiceCount);

    Long actualInvoiceCount = invoiceService.getInvoicesCount();

    assertNotNull(actualInvoiceCount);
    assertEquals(expectedInvoiceCount,actualInvoiceCount);
    verify(invoiceRepository).count();
  }

  @Test
  public void InvoiceService_GetInvoiceById_ThrowsInvoiceNotFoundException() {
    when(invoiceRepository.findInvoiceWithClientAndItemsById(Mockito.anyInt()))
        .thenReturn(Optional.empty());

    assertThrows(
        InvoiceNotFoundException.class, () -> invoiceService.getAnInvoiceById(Mockito.anyInt()));

    verify(invoiceRepository).findInvoiceWithClientAndItemsById(Mockito.anyInt());
  }

  @Test
  public void InvoiceService_UpdateInvoiceById_ReturnInvoiceWithClientAndItemsDTO() {
    String savedInvoiceReference = "INV-001";
    String updatedInvoiceReference = "INV-UPDATED";

    when(invoiceRepository.findInvoiceWithClientAndItemsById(Mockito.anyInt())).thenReturn(Optional.of(invoice));
    when(invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(
            Mockito.any(InvoiceWithItemsAndClientDTO.class)))
        .thenReturn(updatedInvoice);
    when(invoiceRepository.save(Mockito.any(Invoice.class))).thenReturn(updatedInvoice);

    when(invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class)))
        .thenReturn(updatedInvoiceWithClientsAndItemsDTO);

    InvoiceWithItemsAndClientDTO invoiceWithItemsAndClientDTO =
        invoiceService.updateInvoice(updatedInvoiceWithClientsAndItemsDTO, invoice.getId());

    assertNotNull(invoiceWithItemsAndClientDTO);
    assertEquals(updatedInvoiceReference, invoiceWithItemsAndClientDTO.getInvoiceReference());
    assertNotEquals(savedInvoiceReference, invoiceWithItemsAndClientDTO.getInvoiceReference());
  }

  @Test
  public void InvoiceService_UpdateInvoiceById_ThrowInvoiceNotFoundException() {

    when(invoiceRepository.findInvoiceWithClientAndItemsById(Mockito.anyInt())).thenReturn(Optional.empty());

    assertThrows(
        InvoiceNotFoundException.class,
        () -> invoiceService.updateInvoice(invoiceWithItemsAndClientDTO, anyInt()));
    verify(invoiceRepository).findInvoiceWithClientAndItemsById(Mockito.anyInt());
  }

  @Test
  public void InvoiceService_DeleteInvoiceById_ReturnString() {
    when(invoiceRepository.findById(Mockito.anyInt())).thenReturn(Optional.of(invoice));
    doNothing().when(invoiceRepository).delete(Mockito.any(Invoice.class));

    assertAll(() -> invoiceService.deleteInvoiceById(Mockito.anyInt()));
    verify(invoiceRepository).findById(Mockito.anyInt());
    verify(invoiceRepository).delete(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_DeleteInvoiceById_ThrowsInvoiceNotFoundException() {
    when(invoiceRepository.findById(Mockito.anyInt())).thenReturn(Optional.empty());

    assertThrows(
        InvoiceNotFoundException.class, () -> invoiceService.deleteInvoiceById(Mockito.anyInt()));
    verify(invoiceRepository).findById(Mockito.anyInt());
  }
}
