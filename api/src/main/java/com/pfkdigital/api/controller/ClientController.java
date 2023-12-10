package com.pfkdigital.api.controller;

import com.pfkdigital.api.dto.ClientDTO;
import com.pfkdigital.api.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDTO> createNewClient(@RequestBody ClientDTO clientDTO){
        return new ResponseEntity<>(clientService.createNewClient(clientDTO),HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients(){
        return new ResponseEntity<>(clientService.getAllClients(), HttpStatus.OK);
    }
    @GetMapping("/{clientId}")
    public ResponseEntity<?> getClientById(@PathVariable Integer clientId){
        return new ResponseEntity<>(clientService.getClientById(clientId),HttpStatus.OK);
    }
    @PutMapping("/{clientId}")
    public ResponseEntity<?> updateClient(@RequestBody ClientDTO clientDTO, @PathVariable Integer clientId){
        return new ResponseEntity<>(clientService.updateClient(clientDTO,clientId),HttpStatus.CREATED);
    }
    @DeleteMapping("/{clientId}")
    public ResponseEntity<?> deleteClientById(@PathVariable Integer clientId) {
        return new ResponseEntity<>(clientService.deleteClientById(clientId),HttpStatus.OK);
    }

}
