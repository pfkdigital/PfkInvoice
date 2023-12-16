package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.InvoiceItemDTO;

public interface InvoiceItemService {
    InvoiceItemDTO createInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceId);
    String updateInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceItemId);
    String deleteInvoiceItem(Integer invoiceItemId);
}
