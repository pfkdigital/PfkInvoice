package com.pfkdigital.api.repository;

import com.pfkdigital.api.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {
  List<Client> findAllByOrderByIdAsc();

  @Query("SELECT c FROM Client c ORDER BY c.id DESC LIMIT 11")
  List<Client> findLast11OrderByDesc();

  @Query("SELECT c FROM Client c LEFT JOIN FETCH c.invoices WHERE c.id = :id")
  Optional<Client> getClientById(@Param("id") Integer id);
}
