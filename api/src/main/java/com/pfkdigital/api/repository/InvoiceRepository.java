package com.pfkdigital.api.repository;

import com.pfkdigital.api.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
  List<Invoice> findAllByOrderByIdAsc();

  @Query(
      "SELECT i FROM Invoice i JOIN FETCH i.client JOIN FETCH i.invoiceItems WHERE i.id = :invoiceId")
  Optional<Invoice> findInvoiceWithClientAndItemsById(Integer invoiceId);

  @Query("SELECT SUM(i.total) FROM Invoice i")
  BigDecimal getSumOfAllTotalInvoices();

  @Query("SELECT SUM(i.total) FROM Invoice i WHERE i.invoiceStatus = 'Unpaid'")
  BigDecimal getSumOfAllTotalInvoicesUnpaid();
}
