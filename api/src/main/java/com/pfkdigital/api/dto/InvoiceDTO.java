package com.pfkdigital.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private String invoiceReference;
    private Date createdAt;
    private Date paymentDue;
    private String description;
    private Integer paymentTerms;
    private String invoiceStatus;
    private ClientDTO client;
    private List<InvoiceItemDTO> items;
    private BigDecimal total;
}
