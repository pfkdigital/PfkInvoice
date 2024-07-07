package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientWithInvoicesDTO;
import com.pfkdigital.api.dto.CountDTO;

import java.util.List;

public interface ClientService {
  ClientDTO createNewClient(ClientDTO clientDTO);

  List<ClientDTO> getAllClients();

  List<ClientDTO> getLatestClients();

  ClientWithInvoicesDTO getClientById(Integer clientId);

  CountDTO getClientsCount();

  ClientDTO updateClient(ClientDTO clientDTO, Integer clientId);

  String deleteClientById(Integer clientId);
}
