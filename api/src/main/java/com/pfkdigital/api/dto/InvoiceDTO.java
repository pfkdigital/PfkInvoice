package com.pfkdigital.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
  private Integer id;
  private String invoiceReference;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMM-dd")
  private LocalDateTime createdAt;

  private String clientName;
  private String description;
  private Integer paymentTerms;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMM-dd")
  private LocalDateTime paymentDue;

  private BigDecimal total;
  private String invoiceStatus;
}
