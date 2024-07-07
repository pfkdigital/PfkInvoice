package com.pfkdigital.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceWithItemsAndClientDTO {
  private Integer id;
  private String invoiceReference;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMM-dd")
  private LocalDateTime createdAt;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMM-dd")
  private LocalDateTime paymentDue;

  private String description;
  private Integer paymentTerms;
  private String invoiceStatus;
  private BigDecimal total;
  private ClientDTO client;
  private List<InvoiceItemDTO> invoiceItems;
}
