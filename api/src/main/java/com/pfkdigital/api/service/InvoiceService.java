package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceWithItemsAndClientDTO;

import java.math.BigDecimal;
import java.util.List;

public interface InvoiceService {
  InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO);

  List<InvoiceDTO> getAllInvoices();

  InvoiceWithItemsAndClientDTO getAnInvoiceById(Integer invoiceId);

  CurrencyDTO getAllInvoiceTotalSum();

  CurrencyDTO getAllInvoiceTotalSumUnpaid();

  CountDTO getInvoicesCount();

  InvoiceWithItemsAndClientDTO updateInvoice(
      InvoiceWithItemsAndClientDTO invoiceDTO, Integer invoiceId);

  String deleteInvoiceById(Integer invoiceId);
}
