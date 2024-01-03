package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientWithInvoicesDTO;

import java.util.List;

public interface ClientService {
    ClientDTO createNewClient(ClientDTO clientDTO);
    List<ClientDTO> getAllClients();
    ClientWithInvoicesDTO getClientById(Integer clientId);
    Long getClientsCount();
    ClientDTO updateClient(ClientDTO clientDTO,Integer clientId);
    String deleteClientById(Integer clientId);
}
