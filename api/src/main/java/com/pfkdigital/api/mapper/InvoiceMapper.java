package com.pfkdigital.api.mapper;

import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.dto.InvoiceDetailDTO;
import com.pfkdigital.api.entity.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

  @Mapping(source = "client.clientName", target = "clientName")
  InvoiceDTO invoiceToInvoiceDTO(Invoice invoice);

  InvoiceDetailDTO invoiceToInvoiceWithItemsAndClientDTO(Invoice invoice);

  Invoice invoiceWithItemsAndClientDTOToInvoice(InvoiceDetailDTO invoiceDto);
}
