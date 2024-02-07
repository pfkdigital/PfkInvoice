import React from "react";
import { getAllClients } from "@/app/lib/api-functions";
import ClientTable from "@/ui/ClientTable/ClientTable";
import { clientHeaders } from "@/app/lib/tableHeaders";

const ClientsPage = async () => {
  const clients = await getAllClients();

  return (
    clients && (
      <div className={"px-2.5 w-full max-w-[1200px]"}>
        <ClientTable headers={clientHeaders} clients={clients} showBar />
      </div>
    )
  );
};

export default ClientsPage;
