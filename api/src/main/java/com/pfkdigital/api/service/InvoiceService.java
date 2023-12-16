package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;

import java.util.List;

public interface InvoiceService {
    InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO);
    List<InvoiceDTO> getAllInvoices();
    InvoiceWithItemsAndClientDTO getAnInvoiceById(Integer invoiceId);
    InvoiceWithItemsAndClientDTO updateInvoice(InvoiceWithItemsAndClientDTO invoiceDTO,Integer invoiceId);
    String deleteInvoiceById(Integer invoiceId);
}
