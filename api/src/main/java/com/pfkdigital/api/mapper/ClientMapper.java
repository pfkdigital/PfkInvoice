package com.pfkdigital.api.mapper;

import com.pfkdigital.api.dto.AddressDTO;
import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Address;
import com.pfkdigital.api.entity.Client;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {InvoiceMapper.class})
public interface ClientMapper {
  ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

  default ClientDTO clientToClientDTO(Client client) {
    ClientDTO newClientDTO = ClientDTO.builder()
        .id(client.getId())
        .clientName(client.getClientName())
        .clientEmail(client.getClientEmail())
        .clientAddress(AddressMapper.INSTANCE.addressToAddressDTO(client.getClientAddress()))
        .build();

    if (client.getInvoices().size()  > 0) {
      client.getInvoices().stream().map(InvoiceMapper.INSTANCE::invoiceToInvoiceDto).forEach(newClientDTO::addInvoice);
    } else {
      newClientDTO.setInvoiceDTOS(Collections.emptyList());
    }

    return newClientDTO;
  }

  default Client clientDTOToClient(ClientDTO clientDTO) {
    return Client.builder()
        .id(clientDTO.getId())
        .clientName(clientDTO.getClientName())
        .clientEmail(clientDTO.getClientEmail())
        .clientAddress(AddressMapper.INSTANCE.addressDTOToAddress(clientDTO.getClientAddress()))
        .build();
  }
}
