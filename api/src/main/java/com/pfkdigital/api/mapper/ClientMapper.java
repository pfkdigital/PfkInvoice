package com.pfkdigital.api.mapper;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientWithInvoicesDTO;
import com.pfkdigital.api.entity.Client;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = {InvoiceMapper.class})
public interface ClientMapper {
  ClientDTO clientToClientDTO(Client client);
  Client clientDTOToClient(ClientDTO clientDTO);
  ClientWithInvoicesDTO clientToClientWithInvoicesDTO(Client client);
}
