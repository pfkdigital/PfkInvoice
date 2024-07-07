package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.*;

import java.util.List;

public interface InvoiceService {
  InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO);

  List<GraphDataDTO> getRevenueByMonth();

  List<InvoiceDTO> getAllInvoices();

  List<InvoiceDTO> getLatestInvoices();

  InvoiceWithItemsAndClientDTO getAnInvoiceById(Integer invoiceId);

  CurrencyDTO getAllInvoiceTotalSum();

  CurrencyDTO getAllInvoiceTotalSumUnpaid();

  CountDTO getInvoicesCount();

  InvoiceWithItemsAndClientDTO updateInvoice(
      InvoiceWithItemsAndClientDTO invoiceDTO, Integer invoiceId);

  String deleteInvoiceById(Integer invoiceId);
}
