package com.pfkdigital.api.utility;

import com.pfkdigital.api.dto.GraphDataDTO;
import com.pfkdigital.api.entity.Invoice;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
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

  private String getMonthFromDate(LocalDateTime date) {
    return date.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
  }

  private int monthToNumber(String month) {
    return Month.valueOf(month.toUpperCase()).getValue();
  }
}
