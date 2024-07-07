package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.*;
import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import com.pfkdigital.api.exception.InvoiceNotFoundException;
import com.pfkdigital.api.mapper.InvoiceMapper;
import com.pfkdigital.api.repository.InvoiceRepository;
import com.pfkdigital.api.service.InvoiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
  private final InvoiceRepository invoiceRepository;
  private final InvoiceMapper invoiceMapper;

  @Override
  @Transactional
  public InvoiceWithItemsAndClientDTO createInvoice(InvoiceWithItemsAndClientDTO invoiceDTO) {
    Invoice newInvoice = invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(invoiceDTO);
    newInvoice.getInvoiceItems().forEach(item -> item.setInvoice(newInvoice));
    Invoice savedInvoice = invoiceRepository.save(newInvoice);

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(savedInvoice);
  }

  @Override
  public List<GraphDataDTO> getRevenueByMonth() {
    List<Invoice> invoices = invoiceRepository.findAll();

    return createGraphData(invoices);
  }

  @Override
  public List<InvoiceDTO> getAllInvoices() {
    List<Invoice> invoices = invoiceRepository.findAllByOrderByIdAsc();

    return invoices.stream().map(invoiceMapper::invoiceToInvoiceDTO).collect(Collectors.toList());
  }

  @Override
  public List<InvoiceDTO> getLatestInvoices() {
    List<Invoice> latestInvoices = invoiceRepository.findLast11OrderByDesc();

    return latestInvoices.stream()
        .map(invoiceMapper::invoiceToInvoiceDTO)
        .collect(Collectors.toList());
  }

  @Override
  public InvoiceWithItemsAndClientDTO getAnInvoiceById(Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findInvoiceWithClientAndItemsById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(selectedInvoice);
  }

  @Override
  public CurrencyDTO getAllInvoiceTotalSum() {
    BigDecimal total = invoiceRepository.getSumOfAllTotalInvoices();
    String formattedTotal = formatBigDecimal(total);

    return CurrencyDTO.builder().label("Revenue").status(formattedTotal).build();
  }

  @Override
  public CurrencyDTO getAllInvoiceTotalSumUnpaid() {
    BigDecimal total = invoiceRepository.getSumOfAllTotalInvoicesUnpaid();
    String formattedTotal = formatBigDecimal(total);

    return CurrencyDTO.builder().label("Unpaid Revenue").status(formattedTotal).build();
  }

  @Override
  public CountDTO getInvoicesCount() {
    long invoiceCount = invoiceRepository.count();

    return CountDTO.builder().label("Invoices").status(invoiceCount).build();
  }

  @Override
  @Transactional
  public InvoiceWithItemsAndClientDTO updateInvoice(
      InvoiceWithItemsAndClientDTO invoiceDTO, Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findInvoiceWithClientAndItemsById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));
    Invoice updatedInvoice = invoiceMapper.invoiceWithItemsAndClientDTOToInvoice(invoiceDTO);

    selectedInvoice.setInvoiceReference(updatedInvoice.getInvoiceReference());
    selectedInvoice.setCreatedAt(updatedInvoice.getCreatedAt());
    selectedInvoice.setPaymentDue(updatedInvoice.getPaymentDue());
    selectedInvoice.setDescription(updatedInvoice.getDescription());
    selectedInvoice.setPaymentTerms(updatedInvoice.getPaymentTerms());
    selectedInvoice.setInvoiceStatus(updatedInvoice.getInvoiceStatus());
    selectedInvoice.setTotal(updatedInvoice.getTotal());
    selectedInvoice.setClient(updatedInvoice.getClient());
    selectedInvoice.getInvoiceItems().clear();

    List<InvoiceItem> updatedInvoiceItems = updatedInvoice.getInvoiceItems();
    if (updatedInvoiceItems != null) {
      for (InvoiceItem invoiceItem : updatedInvoiceItems) {
        selectedInvoice.addInvoiceItem(invoiceItem);
      }
    }

    Invoice savedUpdatedInvoice = invoiceRepository.save(selectedInvoice);

    return invoiceMapper.invoiceToInvoiceWithItemsAndClientDTO(savedUpdatedInvoice);
  }

  @Override
  @Transactional
  public String deleteInvoiceById(Integer invoiceId) {
    Invoice selectedInvoice =
        invoiceRepository
            .findById(invoiceId)
            .orElseThrow(
                () -> new InvoiceNotFoundException("Invoice of id " + invoiceId + " is not found"));

    invoiceRepository.delete(selectedInvoice);

    return "Invoice of id " + invoiceId + " was deleted";
  }

  private GraphDataDTO getMonthAndRevenueFromInvoice(Invoice invoice) {
    return GraphDataDTO.builder()
        .month(getMonthFromDate(invoice.getPaymentDue()))
        .revenue(invoice.getTotal())
        .build();
  }

  private Map<String, List<GraphDataDTO>> groupGraphDataByMonth(List<GraphDataDTO> graphData) {
    return graphData.stream().collect(Collectors.groupingBy(GraphDataDTO::getMonth));
  }

  private List<GraphDataDTO> sumRevenuesForSameMonth(
      Map<String, List<GraphDataDTO>> groupedGraphData) {
    return groupedGraphData.entrySet().stream()
        .map(
            entry ->
                GraphDataDTO.builder()
                    .month(entry.getKey())
                    .revenue(
                        entry.getValue().stream()
                            .map(GraphDataDTO::getRevenue)
                            .reduce(BigDecimal::add)
                            .orElse(BigDecimal.ZERO))
                    .build())
        .sorted(Comparator.comparingInt(graphData -> monthToNumber(graphData.getMonth())))
        .collect(Collectors.toList());
  }

  private List<GraphDataDTO> createGraphData(List<Invoice> invoices) {
    List<GraphDataDTO> graphData =
        invoices.stream()
            .filter(invoice -> invoice.getInvoiceStatus().equals("Paid"))
            .map(this::getMonthAndRevenueFromInvoice)
            .toList();

    Map<String, List<GraphDataDTO>> groupedGraphData = groupGraphDataByMonth(graphData);

    return sumRevenuesForSameMonth(groupedGraphData);
  }

  private String getMonthFromDate(LocalDateTime date) {
    return date.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
  }

  private int monthToNumber(String month) {
    return Month.valueOf(month.toUpperCase()).getValue();
  }

  public String formatBigDecimal(BigDecimal value) {
    String[] suffixes = new String[] {"", "K", "M", "B", "T"};
    int index = 0;
    while (value.compareTo(new BigDecimal("1000")) >= 0 && index < suffixes.length - 1) {
      value = value.divide(new BigDecimal("1000"), RoundingMode.UP);
      index++;
    }

    DecimalFormat df = new DecimalFormat("#,##0.##");
    return df.format(value) + suffixes[index];
  }
}
