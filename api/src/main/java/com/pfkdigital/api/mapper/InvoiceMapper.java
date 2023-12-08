package com.pfkdigital.api.mapper;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
  InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);
  InvoiceDTO invoiceToInvoiceDto(Invoice invoice);

  default Invoice invoiceDtoToInvoice(InvoiceDTO invoiceDTO, Integer clientId) {
    Invoice newInvoice =
        Invoice.builder()
            .invoiceReference(invoiceDTO.getInvoiceReference())
            .createdAt(invoiceDTO.getCreatedAt())
            .paymentDue(invoiceDTO.getPaymentDue())
            .description(invoiceDTO.getDescription())
            .paymentTerms(invoiceDTO.getPaymentTerms())
            .invoiceStatus(invoiceDTO.getInvoiceStatus())
            .total(invoiceDTO.getTotal())
            .client(ClientMapper.INSTANCE.clientDTOToClient(invoiceDTO.getClient()))
            .build();
    // Set Client
    var client = ClientMapper.INSTANCE.clientDTOToClient(invoiceDTO.getClient());
    client.addInvoice(newInvoice);
    client.setId(clientId);

    newInvoice.setClient(client);

    //Set Items
    invoiceDTO.getItems().stream().map(InvoiceItemMapper.INSTANCE::invoiceItemDTOToInvoiceItem).forEach(newInvoice::addInvoiceItem);

    return newInvoice;
  }
}
