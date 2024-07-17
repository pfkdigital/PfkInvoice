package com.pfkdigital.api.utility;

import com.pfkdigital.api.entity.Invoice;
import com.pfkdigital.api.entity.InvoiceItem;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class TotalCalculatorUtilityTest {

    @InjectMocks
    private TotalCalculatorUtility totalCalculatorUtility;

    @Test
    void TotalCalculator_GivenInvoiceItemList_ReturnBigDecimal() {
        InvoiceItem item1 = InvoiceItem.builder().total(BigDecimal.TEN).build();
        InvoiceItem item2 = InvoiceItem.builder().total(BigDecimal.TEN).build();
        InvoiceItem item3 = InvoiceItem.builder().total(BigDecimal.TEN).build();
        Invoice invoice = Invoice.builder().invoiceItems(List.of(item1, item2, item3)).build();
        BigDecimal expected = BigDecimal.valueOf(30);

        BigDecimal result = totalCalculatorUtility.calculateTotal(invoice.getInvoiceItems());

        assertNotNull(result);
        assertEquals(expected, result);
    }

}
