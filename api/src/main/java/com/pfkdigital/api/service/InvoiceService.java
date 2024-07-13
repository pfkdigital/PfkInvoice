package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.*;

import java.util.List;

public interface InvoiceService {
  InvoiceDetailDTO createInvoice(InvoiceDetailDTO invoiceDTO);

  List<GraphDataDTO> getRevenueByMonth();

  List<InvoiceDTO> getAllInvoices();

  List<InvoiceDTO> getLatestInvoices();

  InvoiceDetailDTO getAnInvoiceById(Integer invoiceId);

  CurrencyDTO getAllInvoiceTotalSum();

  CurrencyDTO getAllInvoiceTotalSumUnpaid();

  CountDTO getInvoicesCount();

  InvoiceDetailDTO updateInvoice(
          InvoiceDetailDTO invoiceDTO, Integer invoiceId);

  String deleteInvoiceById(Integer invoiceId);
}
