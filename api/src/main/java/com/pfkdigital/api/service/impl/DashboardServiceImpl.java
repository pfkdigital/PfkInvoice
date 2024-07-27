package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.repository.ClientRepository;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.DashboardService;
import com.pfkdigital.api.utility.FormatterUtility;
import com.pfkdigital.api.utility.GraphUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

  private final ClientRepository clientRepository;
  private final InvoiceRepository invoiceRepository;
  private final FormatterUtility formatterUtility;
  private final GraphUtility graphUtility;

  @Override
  public CountDTO getInvoicesCount() {
    long invoiceCount = invoiceRepository.count();

    return CountDTO.builder().label("Invoices").status(invoiceCount).build();
  }

  @Override
  public CountDTO getClientsCount() {
    long total = clientRepository.count();

    return CountDTO.builder().label("Clients").status(total).build();
  }

  @Override
  public CurrencyDTO getSumOfInvoiceTotals() {
    BigDecimal total = invoiceRepository.getSumOfAllTotalInvoices();
    String formattedTotal = formatterUtility.formatBigDecimal(total);

    return CurrencyDTO.builder().label("Revenue").status(formattedTotal).build();
  }

  @Override
  public CurrencyDTO getSumOfInvoiceTotalsUnpaid() {
    BigDecimal total = invoiceRepository.getSumOfAllTotalInvoicesUnpaid();
    String formattedTotal = formatterUtility.formatBigDecimal(total);

    return CurrencyDTO.builder().label("Unpaid Revenue").status(formattedTotal).build();
  }

  @Override
  public List<GraphDataDTO> getRevenueByMonth() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return graphUtility.createGraphData(invoices);
  }

  @Override
  public List<GraphDataDTO> countInvoicesByMonth() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return graphUtility.countInvoicesByMonth(invoices);
  }

  @Override
  public List<GraphDataDTO> calculatePaidVsUnpaidProportion() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return graphUtility.calculatePaidVsUnpaidProportion(invoices);
  }

  @Override
  public List<GraphDataDTO> getTopClientsByTotalAmount() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return graphUtility.getTopClientsByInvoiceAmount(invoices);
  }
}
