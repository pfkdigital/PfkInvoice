package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.*;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.InvoiceService;
import com.pfkdigital.api.utility.FormatterUtility;
import com.pfkdigital.api.utility.GraphUtility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
  private final InvoiceRepository invoiceRepository;
  private final InvoiceMapper invoiceMapper;
  private final GraphUtility graphUtility;
  private final FormatterUtility formatterUtility;

  @Override
  @Transactional
  public InvoiceDetailDTO createInvoice(InvoiceDetailDTO invoiceDTO) {
    Invoice newInvoice = invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(invoiceDTO);
    newInvoice.getInvoiceItems().forEach(item -> item.setInvoice(newInvoice));
    Invoice savedInvoice = invoiceRepository.save(newInvoice);

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(savedInvoice);
  }

  @Override
  public List<GraphDataDTO> getRevenueByMonth() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return graphUtility.createGraphData(invoices);
  }

  @Override
  public List<InvoiceDTO> getAllInvoices() {
    List<Invoice> invoices = invoiceRepository.findAllByOrderByIdAsc();

    return invoices.stream().map(invoiceMapper::invoiceToInvoiceDTO).collect(Collectors.toList());
  }

  @Override
  public List<InvoiceDTO> getLatestInvoices() {
    List<Invoice> latestInvoices = invoiceRepository.findLast11OrderByDesc();

    return latestInvoices.stream()
        .map(invoiceMapper::invoiceToInvoiceDTO)
        .collect(Collectors.toList());
  }

  @Override
  public InvoiceDetailDTO getAnInvoiceById(Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findInvoiceDetailById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(selectedInvoice);
  }

  @Override
  public CurrencyDTO getAllInvoiceTotalSum() {
    BigDecimal total = invoiceRepository.getSumOfAllTotalInvoices();
    String formattedTotal = formatterUtility.formatBigDecimal(total);

    return CurrencyDTO.builder().label("Revenue").status(formattedTotal).build();
  }

  @Override
  public CurrencyDTO getAllInvoiceTotalSumUnpaid() {
    BigDecimal total = invoiceRepository.getSumOfAllTotalInvoicesUnpaid();
    String formattedTotal = formatterUtility.formatBigDecimal(total);

    return CurrencyDTO.builder().label("Unpaid Revenue").status(formattedTotal).build();
  }

  @Override
  public CountDTO getInvoicesCount() {
    long invoiceCount = invoiceRepository.count();

    return CountDTO.builder().label("Invoices").status(invoiceCount).build();
  }

  @Override
  @Transactional
  public InvoiceDetailDTO updateInvoice(
          InvoiceDetailDTO invoiceDTO, Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findInvoiceDetailById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));
    Invoice updatedInvoice = invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(invoiceDTO);

    selectedInvoice.setInvoiceReference(updatedInvoice.getInvoiceReference());
    selectedInvoice.setCreatedAt(updatedInvoice.getCreatedAt());
    selectedInvoice.setPaymentDue(updatedInvoice.getPaymentDue());
    selectedInvoice.setDescription(updatedInvoice.getDescription());
    selectedInvoice.setPaymentTerms(updatedInvoice.getPaymentTerms());
    selectedInvoice.setInvoiceStatus(updatedInvoice.getInvoiceStatus());
    selectedInvoice.setTotal(updatedInvoice.getTotal());
    selectedInvoice.setClient(updatedInvoice.getClient());
    selectedInvoice.getInvoiceItems().clear();

    List<InvoiceItem> updatedInvoiceItems = updatedInvoice.getInvoiceItems();
    if (updatedInvoiceItems != null) {
      for (InvoiceItem invoiceItem : updatedInvoiceItems) {
        selectedInvoice.addInvoiceItem(invoiceItem);
      }
    }

    Invoice savedUpdatedInvoice = invoiceRepository.save(selectedInvoice);

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(savedUpdatedInvoice);
  }

  @Override
  @Transactional
  public String deleteInvoiceById(Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));

    invoiceRepository.delete(selectedInvoice);

    return "Invoice of id " + invoiceId + " was deleted";
  }
}
