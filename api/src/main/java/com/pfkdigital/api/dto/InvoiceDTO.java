package com.pfkdigital.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
  private Integer id;
  private String invoiceReference;

  @JsonFormat(pattern = "yyyy-mm-dd")
  private Date createdAt;

  private String clientName;
  private String description;
  private Integer paymentTerms;

  @JsonFormat(pattern = "yyyy-mm-dd")
  private Date paymentDue;

  private BigDecimal total;
  private String invoiceStatus;
}
