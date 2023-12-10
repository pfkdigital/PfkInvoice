package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;

import java.util.List;

public interface InvoiceService {
    InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO);
    InvoiceItemDTO createInvoiceItem(InvoiceItemDTO invoiceItemDTO, Integer invoiceId);
    List<InvoiceDTO> getAllInvoices();
    InvoiceWithItemsAndClientDTO getAnInvoiceById(Integer invoiceId);
    String updateInvoice(InvoiceWithItemsAndClientDTO invoiceDTO,Integer invoiceId);
    String updateInvoiceItem(InvoiceItemDTO invoiceItemDTO,Integer invoiceItemId);
    String deleteInvoiceById(Integer invoiceId);
}
