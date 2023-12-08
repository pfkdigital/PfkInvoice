package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.InvoiceDTO;
import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.exception.ClientNotFoundException;
import com.pfkdigital.api.mapper.ClientMapper;
import com.pfkdigital.api.repository.ClientRepository;
import com.pfkdigital.api.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
  private final ClientRepository clientRepository;

  @Override
  public List<ClientDTO> getAllClients() {
    List<Client> clients = clientRepository.findAll();
    return clients.stream().map(ClientMapper.INSTANCE::clientToClientDTO).toList();
  }

  @Override
  public ClientDTO getClientById(Integer id) {
    Client selectedClient = clientRepository.getClientById(id).orElseThrow(() -> new ClientNotFoundException("Client of id " + id + " was not found"));
    System.out.println(selectedClient.getInvoices());
    return ClientMapper.INSTANCE.clientToClientDTO(selectedClient);
  }

}
