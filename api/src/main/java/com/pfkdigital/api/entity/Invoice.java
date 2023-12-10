package com.pfkdigital.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "invoices")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "invoice_reference")
    private String invoiceReference;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "payment_due")
    private Date paymentDue;

    @Column(name = "description")
    private String description;

    @Column(name = "payment_terms")
    private Integer paymentTerms;

    @Column(name = "invoice_status")
    private String invoiceStatus;

    @Column(name = "total")
    private BigDecimal total;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice")
    private List<InvoiceItem> invoiceItems;

    public void addInvoiceItem(InvoiceItem item) {
        if (invoiceItems == null) {
            invoiceItems = new ArrayList<>();
        }
        item.setInvoice(this);
        invoiceItems.add(item);
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "id=" + id +
                ", invoiceReference='" + invoiceReference + '\'' +
                ", createdAt=" + createdAt +
                ", paymentDue=" + paymentDue +
                ", description='" + description + '\'' +
                ", paymentTerms=" + paymentTerms +
                ", invoiceStatus='" + invoiceStatus + '\'' +
                ", total=" + total +
                '}';
    }
}
