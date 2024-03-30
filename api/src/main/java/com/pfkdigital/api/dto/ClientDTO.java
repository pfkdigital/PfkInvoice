package com.pfkdigital.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {
  private Integer id;
  private String clientName;
  private String clientEmail;
  private AddressDTO clientAddress;
}
