package com.pfkdigital.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientWithInvoicesDTO {
  private Integer id;
  private String clientName;
  private String clientEmail;
  private AddressDTO clientAddress;
  private List<InvoiceDTO> invoices;
}
