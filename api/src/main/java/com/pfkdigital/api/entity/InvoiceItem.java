package com.pfkdigital.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "invoice_items")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal total;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @PrePersist
    @PreUpdate
    private void updateTotal() {
        if (quantity != null && price != null) {
            this.total = price.multiply(BigDecimal.valueOf(quantity));
        }
    }

    @Override
    public String toString() {
        return "InvoiceItem{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", total=" + total +
                '}';
    }
}
