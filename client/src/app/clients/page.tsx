import React from 'react'
import {getAllClients} from "@/app/lib/api-functions";
import ClientTable from "@/app/ui/ClientTable/ClientTable";
import {clientHeaders} from "@/app/lib/tableHeaders";

const ClientsPage = async() => {
  const clients = await getAllClients();

  return clients && <ClientTable headers={clientHeaders} clients={clients} />
}

export default ClientsPage