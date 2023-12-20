package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceItemNotFoundException;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceItemMapper;
import com.pfkdigital.api.repository.InvoiceItemRepository;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.InvoiceItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceItemServiceImpl implements InvoiceItemService {
  private final InvoiceRepository invoiceRepository;
  private final InvoiceItemRepository invoiceItemRepository;
  private final InvoiceItemMapper invoiceItemMapper;

  @Override
  @Transactional
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
  public List<InvoiceItemDTO> getAllInvoiceItem() {
    List<InvoiceItem> items = invoiceItemRepository.findAll();
    return items.stream().map(invoiceItemMapper::invoiceItemToInvoiceItemDTO).toList();
  }

  @Override
  public InvoiceItemDTO getInvoiceItemById(Integer invoiceItemId) {
    InvoiceItem item =
        invoiceItemRepository
            .findById(invoiceItemId)
            .orElseThrow(
                () ->
                    new InvoiceItemNotFoundException(
                        "Invoice item of id " + invoiceItemId + " is not found"));
    return invoiceItemMapper.invoiceItemToInvoiceItemDTO(item);
  }

  @Override
  @Transactional
  public String updateInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceItemId) {
    InvoiceItem newInvoiceItem = invoiceItemMapper.invoiceItemDTOToInvoiceItem(invoiceItemDTO);
    InvoiceItem invoiceItem =
        invoiceItemRepository
            .findById(invoiceItemId)
            .orElseThrow(
                () ->
                    new InvoiceItemNotFoundException(
                        "Invoice item of id " + invoiceItemId + " is not found"));
    invoiceItem.setName(newInvoiceItem.getName());
    invoiceItem.setPrice(newInvoiceItem.getPrice());
    invoiceItem.setQuantity(newInvoiceItem.getQuantity());
    invoiceItem.setTotal(newInvoiceItem.getTotal());

    invoiceItemRepository.save(invoiceItem);

    return "Invoice item of id " + invoiceItemId + " was updated";
  }

  @Override
  @Transactional
  public String deleteInvoiceItem(Integer invoiceItemId) {
    InvoiceItem invoiceItem =
        invoiceItemRepository
            .findById(invoiceItemId)
            .orElseThrow(
                () ->
                    new InvoiceItemNotFoundException(
                        "Invoice Item of id " + invoiceItemId + " was not found"));

    invoiceItemRepository.delete(invoiceItem);

    return "Invoice item of id " + invoiceItemId + " was deleted";
  }
}
