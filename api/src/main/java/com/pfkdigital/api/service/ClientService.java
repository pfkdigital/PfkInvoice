package com.pfkdigital.api.service;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Client;

import java.util.List;

public interface ClientService {
    List<ClientDTO> getAllClients();
    ClientDTO getClientById(Integer id);
}
