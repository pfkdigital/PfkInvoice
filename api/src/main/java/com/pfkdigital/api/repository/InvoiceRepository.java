package com.pfkdigital.api.repository;

import com.pfkdigital.api.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
    @Query("SELECT i FROM Invoice i JOIN FETCH i.client JOIN FETCH i.invoiceItems WHERE i.id = :invoiceId")
    Optional<Invoice> findInvoiceWithClientAndItemsById(Integer invoiceId);
}
