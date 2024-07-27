package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.dto.CurrencyDTO;
import com.pfkdigital.api.dto.GraphDataDTO;

import java.util.List;

public interface DashboardService {
    CountDTO getInvoicesCount();

    CountDTO getClientsCount();

    CurrencyDTO getSumOfInvoiceTotals();

    CurrencyDTO getSumOfInvoiceTotalsUnpaid();

    List<GraphDataDTO> getRevenueByMonth();

    List<GraphDataDTO> countInvoicesByMonth();

    List<GraphDataDTO> calculatePaidVsUnpaidProportion();

    List<GraphDataDTO> getTopClientsByTotalAmount();
}
