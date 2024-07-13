package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.*;
import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.impl.InvoiceServiceImpl;
import com.pfkdigital.api.utility.FormatterUtility;
import com.pfkdigital.api.utility.GraphUtility;
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
public class InvoiceServiceTest {
  @Mock private InvoiceRepository invoiceRepository;
  @Mock private InvoiceMapper invoiceMapper;
  @Mock private GraphUtility graphUtility;
  @Mock private FormatterUtility formatterUtility;
  @InjectMocks private InvoiceServiceImpl invoiceService;

  @Test
  public void InvoiceService_CreateNewInvoice_ReturnNewInvoiceDTO() {
    String savedInvoiceReference = "INV-001";

    Client client = Client.builder().id(1).clientName("Acme Company").build();
    InvoiceItem invoiceItem = InvoiceItem.builder().id(1).name("INV-ITEM-1").build();
    Invoice invoice =
        Invoice.builder().id(1).invoiceReference(savedInvoiceReference).client(client).build();
    invoice.addInvoiceItem(invoiceItem);

    ClientDTO clientDTO = ClientDTO.builder().id(1).clientName("Acme Company").build();
    InvoiceItemDTO invoiceItemDTO = InvoiceItemDTO.builder().id(1).name("INV-ITEM-1").build();
    InvoiceDetailDTO invoiceDetailDTO =
        InvoiceDetailDTO.builder()
            .id(1)
            .invoiceReference(savedInvoiceReference)
            .client(clientDTO)
            .invoiceItems(List.of(invoiceItemDTO))
            .build();

    when(invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(
            Mockito.any(InvoiceDetailDTO.class)))
        .thenReturn(invoice);
    when(invoiceRepository.save(invoice)).thenReturn(invoice);
    when(invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class)))
        .thenReturn(invoiceDetailDTO);

    InvoiceDetailDTO savedInvoice =
        invoiceService.createInvoice(invoiceDetailDTO);

    assertNotNull(savedInvoice);
    assertEquals(savedInvoiceReference, savedInvoice.getInvoiceReference());
    verify(invoiceRepository, times(1)).save(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_GetAllInvoices_ReturnInvoiceDTOList() {
    String savedInvoiceReference = "INV-001";
    Invoice invoice = Invoice.builder().id(1).invoiceReference(savedInvoiceReference).build();
    InvoiceDTO invoiceDTO =
        InvoiceDTO.builder().id(1).invoiceReference(savedInvoiceReference).build();

    when(invoiceRepository.findAllByOrderByIdAsc()).thenReturn(List.of(invoice));
    when(invoiceMapper.invoiceToInvoiceDTO(Mockito.any(Invoice.class))).thenReturn(invoiceDTO);

    List<InvoiceDTO> invoiceDTOList = invoiceService.getAllInvoices();

    assertNotNull(invoiceDTOList);
    assertEquals(savedInvoiceReference, invoiceDTOList.get(0).getInvoiceReference());
    assertEquals(1, invoiceDTOList.size());

    verify(invoiceRepository).findAllByOrderByIdAsc();
    verify(invoiceMapper, times(1)).invoiceToInvoiceDTO(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_GetInvoiceById_ReturnInvoiceWithItemsAndClientDTO() {
    String savedInvoiceReference = "INV-001";
    Invoice invoice = Invoice.builder().id(1).invoiceReference(savedInvoiceReference).build();
    InvoiceDetailDTO invoiceDetailDTO =
        InvoiceDetailDTO.builder()
            .id(1)
            .invoiceReference(savedInvoiceReference)
            .build();

    when(invoiceRepository.findInvoiceDetailById(Mockito.anyInt()))
        .thenReturn(Optional.of(invoice));
    when(invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class)))
        .thenReturn(invoiceDetailDTO);

    InvoiceDetailDTO invoiceDTO = invoiceService.getAnInvoiceById(Mockito.anyInt());

    assertNotNull(invoiceDTO);
    assertEquals(savedInvoiceReference, invoiceDTO.getInvoiceReference());

    verify(invoiceRepository).findInvoiceDetailById(Mockito.anyInt());
    verify(invoiceMapper, times(1))
        .invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class));
  }

  @Test
  public void InvoiceService_GetInvoiceTotalSums_ReturnSum() {
    BigDecimal expectedTotalSum = BigDecimal.valueOf(15000.00);
    String expectedResult = "15K";

    when(invoiceRepository.getSumOfAllTotalInvoices()).thenReturn(expectedTotalSum);
    when(formatterUtility.formatBigDecimal(Mockito.any(BigDecimal.class)))
        .thenReturn(expectedResult);
    CurrencyDTO actualTotalSum = invoiceService.getAllInvoiceTotalSum();

    assertNotNull(actualTotalSum);
    assertEquals(expectedResult, actualTotalSum.getStatus());

    verify(invoiceRepository).getSumOfAllTotalInvoices();
    verify(formatterUtility).formatBigDecimal(Mockito.any(BigDecimal.class));
  }

  @Test
  public void InvoiceService_GetUnpaidInvoiceTotalSums_ReturnSum() {
    BigDecimal expectedTotalSum = BigDecimal.valueOf(15000.00);
    String expectedResult = "15K";

    when(invoiceRepository.getSumOfAllTotalInvoicesUnpaid()).thenReturn(expectedTotalSum);
    when(formatterUtility.formatBigDecimal(Mockito.any(BigDecimal.class)))
        .thenReturn(expectedResult);

    CurrencyDTO actualTotalSum = invoiceService.getAllInvoiceTotalSumUnpaid();

    assertNotNull(actualTotalSum);
    assertEquals(expectedResult, actualTotalSum.getStatus());

    verify(invoiceRepository).getSumOfAllTotalInvoicesUnpaid();
    verify(formatterUtility).formatBigDecimal(Mockito.any(BigDecimal.class));
  }

  @Test
  public void InvoiceService_GetInvoiceCount_ReturnCountDTO() {
    long expectedInvoiceCount = 1;
    CountDTO countDTO = CountDTO.builder().label("Invoice").status(1L).build();

    when(invoiceRepository.count()).thenReturn(expectedInvoiceCount);

    CountDTO actualInvoiceCount = invoiceService.getInvoicesCount();

    assertNotNull(actualInvoiceCount);
    assertEquals(expectedInvoiceCount, actualInvoiceCount.getStatus());
    verify(invoiceRepository).count();
  }

  @Test
  public void InvoiceService_GetInvoiceById_ThrowsInvoiceNotFoundException() {
    when(invoiceRepository.findInvoiceDetailById(Mockito.anyInt()))
        .thenReturn(Optional.empty());

    assertThrows(
        InvoiceNotFoundException.class, () -> invoiceService.getAnInvoiceById(Mockito.anyInt()));

    verify(invoiceRepository).findInvoiceDetailById(Mockito.anyInt());
  }

  @Test
  public void InvoiceService_UpdateInvoiceById_ReturnInvoiceWithClientAndItemsDTO() {
    String savedInvoiceReference = "INV-001";
    String updatedInvoiceReference = "INV-UPDATED";

    Client client = Client.builder().id(1).clientName("Acme Company").build();
    InvoiceItem invoiceItem = InvoiceItem.builder().id(1).name("INV-ITEM-1").build();
    Invoice invoice =
        Invoice.builder().id(1).invoiceReference(savedInvoiceReference).client(client).build();
    Invoice updatedInvoice =
        Invoice.builder().id(1).invoiceReference(updatedInvoiceReference).client(client).build();
    invoice.addInvoiceItem(invoiceItem);

    ClientDTO clientDTO = ClientDTO.builder().id(1).clientName("Acme Company").build();
    InvoiceItemDTO invoiceItemDTO = InvoiceItemDTO.builder().id(1).name("INV-ITEM-1").build();
    InvoiceDetailDTO invoiceDetailDTO =
        InvoiceDetailDTO.builder()
            .id(1)
            .invoiceReference(savedInvoiceReference)
            .client(clientDTO)
            .invoiceItems(List.of(invoiceItemDTO))
            .build();
    InvoiceDetailDTO updatedInvoiceWithClientsAndItemsDTO =
        InvoiceDetailDTO.builder()
            .id(1)
            .invoiceReference(updatedInvoiceReference)
            .client(clientDTO)
            .invoiceItems(List.of(invoiceItemDTO))
            .build();

    when(invoiceRepository.findInvoiceDetailById(Mockito.anyInt()))
        .thenReturn(Optional.of(invoice));
    when(invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(
            Mockito.any(InvoiceDetailDTO.class)))
        .thenReturn(updatedInvoice);
    when(invoiceRepository.save(Mockito.any(Invoice.class))).thenReturn(updatedInvoice);

    when(invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(Mockito.any(Invoice.class)))
        .thenReturn(updatedInvoiceWithClientsAndItemsDTO);

    InvoiceDetailDTO updatedInvoiceDTO =
        invoiceService.updateInvoice(updatedInvoiceWithClientsAndItemsDTO, invoice.getId());

    assertNotNull(updatedInvoiceDTO);
    assertEquals(updatedInvoiceReference, updatedInvoiceDTO.getInvoiceReference());
  }

  @Test
  public void InvoiceService_UpdateInvoiceById_ThrowInvoiceNotFoundException() {
    InvoiceDetailDTO invoiceDetailDTO =
        InvoiceDetailDTO.builder().id(1).build();

    when(invoiceRepository.findInvoiceDetailById(Mockito.anyInt()))
        .thenReturn(Optional.empty());

    assertThrows(
        InvoiceNotFoundException.class,
        () -> invoiceService.updateInvoice(invoiceDetailDTO, anyInt()));

    verify(invoiceRepository).findInvoiceDetailById(Mockito.anyInt());
  }

  @Test
  public void InvoiceService_DeleteInvoiceById_ReturnString() {
    Invoice invoice = Invoice.builder().id(1).build();

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

  @Test
  void InvoiceService_GetRevenueByMonth_ReturnGraphDataDTOList() {
    List<GraphDataDTO> graphDataDTOList =
        List.of(GraphDataDTO.builder().month("January").revenue(BigDecimal.valueOf(1000)).build());
    when(graphUtility.createGraphData(anyList())).thenReturn(graphDataDTOList);

    List<GraphDataDTO> actualGraphDataDTOList = invoiceService.getRevenueByMonth();

    assertNotNull(actualGraphDataDTOList);
    assertEquals(1, actualGraphDataDTOList.size());
    assertEquals("January", actualGraphDataDTOList.get(0).getMonth());
    assertEquals(BigDecimal.valueOf(1000), actualGraphDataDTOList.get(0).getRevenue());

    verify(graphUtility).createGraphData(anyList());
  }
}
