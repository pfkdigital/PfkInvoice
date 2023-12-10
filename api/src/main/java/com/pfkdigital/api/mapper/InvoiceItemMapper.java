package com.pfkdigital.api.mapper;

import com.pfkdigital.api.dto.InvoiceItemDTO;
import com.pfkdigital.api.entity.InvoiceItem;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceItemMapper {
    InvoiceItemDTO invoiceItemToInvoiceItemDTO(InvoiceItem invoiceItem);
    InvoiceItem invoiceItemDTOToInvoiceItem(InvoiceItemDTO invoiceItemDTO);
}
