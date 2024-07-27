package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.*;

import java.util.List;
import java.util.Map;

public interface InvoiceService {
  InvoiceDetailDTO createInvoice(InvoiceDetailDTO invoiceDTO);

  List<InvoiceDTO> getAllInvoices();

  List<InvoiceDTO> getLatestInvoices();

  InvoiceDetailDTO getAnInvoiceById(Integer invoiceId);

  InvoiceDetailDTO updateInvoice(
          InvoiceDetailDTO invoiceDTO, Integer invoiceId);

  String deleteInvoiceById(Integer invoiceId);
}
