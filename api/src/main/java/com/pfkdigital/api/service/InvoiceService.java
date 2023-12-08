package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Invoice;

import java.util.List;

public interface InvoiceService {
    List<Invoice> getAllInvoices();
    Invoice getInvoiceById(Integer invoiceId);
    String deleteInvoiceById(Integer invoiceId);
    Invoice createInvoice(Integer id,InvoiceDTO invoiceDto);
}
