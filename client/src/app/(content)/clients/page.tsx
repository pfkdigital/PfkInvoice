import React from "react";
import { getAllClients } from "@/lib/api-functions";
import ClientTable from "@/ui/ClientTable/ClientTable";
import { clientHeaders } from "@/lib/tableHeaders";

const ClientsPage = async () => {
  const clients = await getAllClients();

  return (
    clients && (
      <div
        className={
          "rounded-[10px] px-2.5 w-full max-w-[1200px] bg-midnight md:bg-eclipse md:py-9 md:px-[50px]"
        }
      >
        <ClientTable
          headers={clientHeaders}
          clients={clients}
          showControlRow={true}
        />
      </div>
    )
  );
};

export default ClientsPage;
