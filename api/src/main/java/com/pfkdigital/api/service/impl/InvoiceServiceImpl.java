package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.InvoiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
  private final InvoiceRepository invoiceRepository;
  private final InvoiceMapper invoiceMapper;

  @Override
  @Transactional
  public InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO) {
    Invoice newInvoice = invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(invoiceDTO);
    newInvoice.getInvoiceItems().forEach(item -> item.setInvoice(newInvoice));
    Invoice savedInvoice = invoiceRepository.save(newInvoice);

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(savedInvoice);
  }

  @Override
  public List<InvoiceDTO> getAllInvoices() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return invoices.stream().map(invoiceMapper::invoiceToInvoiceDTO).collect(Collectors.toList());
  }

  @Override
  public InvoiceWithItemsAndClientDTO getAnInvoiceById(Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findInvoiceWithClientAndItemsById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(selectedInvoice);
  }

  @Override
  @Transactional
  public InvoiceWithItemsAndClientDTO updateInvoice(
      InvoiceWithItemsAndClientDTO invoiceDTO, Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findInvoiceWithClientAndItemsById(invoiceId)
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
    invoiceRepository.save(selectedInvoice);

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
