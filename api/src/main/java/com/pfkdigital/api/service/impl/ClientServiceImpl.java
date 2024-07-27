package com.pfkdigital.api.service.impl;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.dto.ClientDetailDTO;
import com.pfkdigital.api.dto.CountDTO;
import com.pfkdigital.api.entity.Client;
import com.pfkdigital.api.exception.ClientNotFoundException;
import com.pfkdigital.api.mapper.ClientMapper;
import com.pfkdigital.api.repository.ClientRepository;
import com.pfkdigital.api.service.ClientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
  private final ClientRepository clientRepository;
  private final ClientMapper clientMapper;

  @Override
  @Transactional
  public ClientDTO createNewClient(ClientDTO clientDTO) {
    Client newClient = clientMapper.clientDTOToClient(clientDTO);
    Client savedClient = clientRepository.save(newClient);

    return clientMapper.clientToClientDTO(savedClient);
  }

  @Override
  public List<ClientDTO> getAllClients() {
    return clientRepository.findAllByOrderByIdAsc().stream()
        .map(clientMapper::clientToClientDTO)
        .toList();
  }

  @Override
  public List<ClientDTO> getLatestClients() {
    return clientRepository.findLast11OrderByDesc().stream()
        .map(clientMapper::clientToClientDTO)
        .toList();
  }

  @Override
  public ClientDetailDTO getClientById(Integer clientId) {
    Client selectedClient =
        clientRepository
            .getClientWithInvoicesById(clientId)
            .orElseThrow(
                () -> new ClientNotFoundException("Client of id " + clientId + " was not found"));
    return clientMapper.clientToClientWithInvoicesDTO(selectedClient);
  }

  @Override
  @Transactional
  public ClientDTO updateClient(ClientDTO clientDTO, Integer clientId) {
    Client mappedClient = clientMapper.clientDTOToClient(clientDTO);
    Client selectedClient =
        clientRepository
            .findById(clientId)
            .orElseThrow(
                () -> new ClientNotFoundException("Client of id " + clientId + " was not found"));

    selectedClient.setClientName(mappedClient.getClientName());
    selectedClient.setClientEmail(mappedClient.getClientEmail());
    selectedClient.setClientAddress(mappedClient.getClientAddress());

    Client updatedClient = clientRepository.save(selectedClient);

    return clientMapper.clientToClientDTO(updatedClient);
  }

  @Override
  @Transactional
  public String deleteClientById(Integer clientId) {
    Client selectedClient =
        clientRepository
            .findById(clientId)
            .orElseThrow(
                () -> new ClientNotFoundException("Client of id " + clientId + " was not found"));
    clientRepository.delete(selectedClient);

    return "Client of id " + clientId + " was deleted";
  }
}
