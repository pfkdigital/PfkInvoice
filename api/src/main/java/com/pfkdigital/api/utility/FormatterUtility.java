package com.pfkdigital.api.utility;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;

@Component
public class FormatterUtility {
  public String formatBigDecimal(BigDecimal value) {
    String[] suffixes = new String[] {"", "K", "M", "B", "T"};
    int index = 0;
    while (value.compareTo(new BigDecimal("1000")) >= 0 && index < suffixes.length - 1) {
      value = value.divide(new BigDecimal("1000"), RoundingMode.UP);
      index++;
    }

    DecimalFormat df = new DecimalFormat("#,##0.##");
    return df.format(value) + suffixes[index];
  }
}
