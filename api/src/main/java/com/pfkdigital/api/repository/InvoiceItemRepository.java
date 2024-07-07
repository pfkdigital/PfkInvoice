package com.pfkdigital.api.repository;

import com.pfkdigital.api.entity.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem,Integer> {}
