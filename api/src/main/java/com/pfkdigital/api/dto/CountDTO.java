package com.pfkdigital.api.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CountDTO {
  private String label;
  private long status;
}
