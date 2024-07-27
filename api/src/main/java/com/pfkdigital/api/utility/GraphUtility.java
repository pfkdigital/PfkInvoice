package com.pfkdigital.api.utility;

import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.entity.Invoice;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class GraphUtility {

  public List<GraphDataDTO> createGraphData(List<Invoice> invoices) {
    List<GraphDataDTO> graphData =
        invoices.stream()
            .filter(invoice -> invoice.getInvoiceStatus().equals("Paid"))
            .map(this::getMonthAndRevenueFromInvoice)
            .toList();

    Map<String, List<GraphDataDTO>> groupedGraphData = groupGraphDataByMonth(graphData);

    return sumRevenuesForSameMonth(groupedGraphData);
  }

  public List<GraphDataDTO> countInvoicesByMonth(List<Invoice> invoices) {
    Map<String, Long> invoicesByMonth =
        invoices.stream()
            .collect(
                Collectors.groupingBy(
                    invoice -> getMonthFromDate(invoice.getCreatedAt()), Collectors.counting()));

    return invoicesByMonth.entrySet().stream()
        .map(entry -> new GraphDataDTO(entry.getKey(), BigDecimal.valueOf(entry.getValue())))
        .sorted(Comparator.comparingInt(data -> monthToNumber(data.getKey())))
        .toList();
  }

  public List<GraphDataDTO> calculatePaidVsUnpaidProportion(List<Invoice> invoices) {
    long totalInvoices = invoices.size();

    long paidInvoicesCount =
        invoices.stream()
            .filter(invoice -> "Paid".equalsIgnoreCase(invoice.getInvoiceStatus()))
            .count();

    long unpaidInvoicesCount = totalInvoices - paidInvoicesCount;

    double paidProportion = (double) paidInvoicesCount / totalInvoices;
    double unpaidProportion = (double) unpaidInvoicesCount / totalInvoices;

    GraphDataDTO paid = new GraphDataDTO("paid", BigDecimal.valueOf(paidProportion));
    GraphDataDTO unpaid = new GraphDataDTO("unpaid", BigDecimal.valueOf(unpaidProportion));

    return List.of(paid, unpaid);
  }

  public List<GraphDataDTO> getTopClientsByInvoiceAmount(List<Invoice> invoices) {

    Map<String, BigDecimal> clientTotalAmount = invoices.stream()
            .collect(Collectors.groupingBy(
                    invoice -> invoice.getClient().getClientName(),
                    Collectors.reducing(BigDecimal.ZERO, Invoice::getTotal, BigDecimal::add)
            ));

    return clientTotalAmount.entrySet().stream()
            .map(entry -> new GraphDataDTO(entry.getKey(), entry.getValue()))
            .sorted(Comparator.comparing(GraphDataDTO::getValue).reversed())
            .limit(5)
            .collect(Collectors.toList());
  }


  private GraphDataDTO getMonthAndRevenueFromInvoice(Invoice invoice) {
    return GraphDataDTO.builder()
        .key(getMonthFromDate(invoice.getPaymentDue()))
        .value(invoice.getTotal())
        .build();
  }

  private Map<String, List<GraphDataDTO>> groupGraphDataByMonth(List<GraphDataDTO> graphData) {
    return graphData.stream().collect(Collectors.groupingBy(GraphDataDTO::getKey));
  }

  private List<GraphDataDTO> sumRevenuesForSameMonth(
      Map<String, List<GraphDataDTO>> groupedGraphData) {
    return groupedGraphData.entrySet().stream()
        .map(
            entry ->
                GraphDataDTO.builder()
                    .key(entry.getKey())
                    .value(
                        entry.getValue().stream()
                            .map(GraphDataDTO::getValue)
                            .reduce(BigDecimal::add)
                            .orElse(BigDecimal.ZERO))
                    .build())
        .sorted(Comparator.comparingInt(graphData -> monthToNumber(graphData.getKey())))
        .collect(Collectors.toList());
  }

  private String getMonthFromDate(LocalDateTime date) {
    return date.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
  }

  private int monthToNumber(String month) {
    return Month.valueOf(month.toUpperCase()).getValue();
  }
}
