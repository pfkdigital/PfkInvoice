package com.pfkdigital.api.utility;

import com.pfkdigital.api.entity.InvoiceItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class TotalCalculatorUtility {
  public BigDecimal calculateTotal(List<InvoiceItem> items) {
    if (items == null) return BigDecimal.ZERO;

    BigDecimal newTotal = BigDecimal.ZERO;
    for (InvoiceItem item : items) {
      if (item.getTotal() != null) {
        newTotal = newTotal.add(item.getTotal());
      }
    }
    return newTotal;
  }
}
