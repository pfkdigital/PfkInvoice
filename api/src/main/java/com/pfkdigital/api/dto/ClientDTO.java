package com.pfkdigital.api.dto;

import com.pfkdigital.api.entity.Invoice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {
    private Integer id;
    private String clientName;
    private String clientEmail;
    private AddressDTO clientAddress;
    private List<InvoiceDTO> invoiceDTOS;

    public void addInvoice(InvoiceDTO invoiceDTO){
        if(invoiceDTOS == null){
            invoiceDTOS = new ArrayList<>();
        }
        invoiceDTO.setClient(this);
        invoiceDTOS.add(invoiceDTO);
    }
}