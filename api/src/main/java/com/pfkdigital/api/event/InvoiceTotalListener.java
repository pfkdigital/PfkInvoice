package com.pfkdigital.api.event;


import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import jakarta.persistence.*;

import java.math.BigDecimal;

public class InvoiceTotalListener {
    @PostLoad
    @PostPersist
    @PostUpdate
    public void updateTotal(Invoice invoice) {
        if(invoice.getInvoiceItems() == null) return;

        BigDecimal newTotal = BigDecimal.ZERO;
        for (InvoiceItem item : invoice.getInvoiceItems()) {
            if (item.getTotal() != null) {
                newTotal = newTotal.add(item.getTotal());
            }
        }
        invoice.setTotal(newTotal);
    }
}