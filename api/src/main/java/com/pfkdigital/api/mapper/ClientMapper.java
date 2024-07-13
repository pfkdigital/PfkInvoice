package com.pfkdigital.api.mapper;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientDetailDTO;
import com.pfkdigital.api.entity.Client;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = {InvoiceMapper.class})
public interface ClientMapper {
  ClientDTO clientToClientDTO(Client client);

  Client clientDTOToClient(ClientDTO clientDTO);

  ClientDetailDTO clientToClientWithInvoicesDTO(Client client);
}
