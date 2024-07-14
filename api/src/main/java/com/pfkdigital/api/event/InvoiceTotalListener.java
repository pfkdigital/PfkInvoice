package com.pfkdigital.api.event;

import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.utility.TotalCalculatorUtility;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class InvoiceTotalListener {

  private final TotalCalculatorUtility totalCalculatorUtility;

  @PostLoad
  @PostPersist
  @PostUpdate
  public void recalculateTotal(Invoice invoice) {
    if (invoice.getInvoiceItems() == null) return;

    BigDecimal updatedTotal = totalCalculatorUtility.calculateTotal(invoice.getInvoiceItems());
    invoice.setTotal(updatedTotal);
  }
}
