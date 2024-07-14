package com.pfkdigital.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "invoice_items")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class InvoiceItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "name")
  private String name;

  @Column(name = "quantity")
  private Integer quantity;

  @Column(name = "price")
  private BigDecimal price;

  @Column(name = "total")
  private BigDecimal total;

  @ManyToOne
  @JoinColumn(name = "invoice_id")
  private Invoice invoice;

  @Override
  public String toString() {
    return "InvoiceItem{"
        + "id="
        + id
        + ", name='"
        + name
        + '\''
        + ", quantity="
        + quantity
        + ", price="
        + price
        + ", total="
        + total
        + '}';
  }
}
