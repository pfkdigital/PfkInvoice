package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceItemMapper;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.ClientRepository;
import com.pfkdigital.api.repository.InvoiceItemRepository;
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
  private final ClientRepository clientRepository;
  private final InvoiceRepository invoiceRepository;
  private final InvoiceItemRepository invoiceItemRepository;
  private final InvoiceMapper invoiceMapper;
  private final InvoiceItemMapper invoiceItemMapper;

  @Override
  @Transactional
  public InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO) {
    Invoice newInvoice = invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(invoiceDTO);
    newInvoice.getInvoiceItems().forEach(item -> item.setInvoice(newInvoice));
    Invoice savedInvoice = invoiceRepository.save(newInvoice);

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(savedInvoice);
  }

  @Override
  public InvoiceItemDTO createInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceId) {
    InvoiceItem newInvoiceItem = invoiceItemMapper.invoiceItemDTOToInvoiceItem(invoiceItemDTO);
    Invoice invoice =
        invoiceRepository
            .findById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));

    newInvoiceItem.setInvoice(invoice);
    InvoiceItem savedInvoiceItem = invoiceItemRepository.save(newInvoiceItem);

    return invoiceItemMapper.invoiceItemToInvoiceItemDTO(savedInvoiceItem);
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
  public String updateInvoice(InvoiceWithItemsAndClientDTO invoiceDTO, Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findById(invoiceId)
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
    updatedInvoice.getInvoiceItems().forEach(selectedInvoice::addInvoiceItem);

    invoiceRepository.save(selectedInvoice);

    return "Invoice of id " + invoiceId + " was updated";
  }

  @Override
  public String updateInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceItemId) {
    InvoiceItem newInvoiceItem = invoiceItemMapper.invoiceItemDTOToInvoiceItem(invoiceItemDTO);
    InvoiceItem invoiceItem =
            invoiceItemRepository
                    .findById(invoiceItemId)
                    .orElseThrow(
                            () -> new InvoiceNotFoundException("Invoice of id " + invoiceItemId + " is not found"));
    invoiceItem.setName(newInvoiceItem.getName());
    invoiceItem.setPrice(newInvoiceItem.getPrice());
    invoiceItem.setQuantity(newInvoiceItem.getQuantity());
    invoiceItem.setTotal(newInvoiceItem.getTotal());

    invoiceItemRepository.save(invoiceItem);

    return "Invoice item of id " + invoiceItemId + " was updated";
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
