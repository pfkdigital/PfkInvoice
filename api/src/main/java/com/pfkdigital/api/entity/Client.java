package com.pfkdigital.api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clients")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "client_email")
    private String clientEmail;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "street", column = @Column(name = "client_street")),
            @AttributeOverride(name = "city", column = @Column(name = "client_city")),
            @AttributeOverride(name = "postcode", column = @Column(name = "client_post_code")),
            @AttributeOverride(name = "country", column = @Column(name = "client_country"))
    })
    private Address clientAddress;

    @OneToMany(mappedBy = "client",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Invoice> invoices;

    public void addInvoice(Invoice invoice){
        if(invoices == null){
            invoices = new ArrayList<>();
        }
        invoice.setClient(this);
        invoices.add(invoice);
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", clientName='" + clientName + '\'' +
                ", clientEmail='" + clientEmail + '\'' +
                ", clientAddress=" + clientAddress +
                '}';
    }
}
