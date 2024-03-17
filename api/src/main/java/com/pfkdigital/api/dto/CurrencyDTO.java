package com.pfkdigital.api.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurrencyDTO {
    private String label;
    private String status;
}
