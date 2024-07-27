package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientDetailDTO;

import java.util.List;

public interface ClientService {
  ClientDTO createNewClient(ClientDTO clientDTO);

  List<ClientDTO> getAllClients();

  List<ClientDTO> getLatestClients();

  ClientDetailDTO getClientById(Integer clientId);

  ClientDTO updateClient(ClientDTO clientDTO, Integer clientId);

  String deleteClientById(Integer clientId);
}
