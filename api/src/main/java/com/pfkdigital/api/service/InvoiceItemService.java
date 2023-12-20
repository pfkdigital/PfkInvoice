package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.InvoiceItemDTO;

import java.util.List;

public interface InvoiceItemService {
    InvoiceItemDTO createInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceId);
    List<InvoiceItemDTO> getAllInvoiceItem();
    InvoiceItemDTO getInvoiceItemById(Integer id);
    String updateInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceItemId);
    String deleteInvoiceItem(Integer invoiceItemId);
}
