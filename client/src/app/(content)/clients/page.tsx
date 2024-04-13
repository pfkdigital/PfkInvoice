import { getAllClients } from "@/lib/api-functions";
import { clientHeaders } from "@/lib/tableHeaders";
import ClientTable from "@/ui/ClientTable/ClientTable";

export const fetchCache = "only-no-store";

const ClientsPage = async () => {
  const clients = await getAllClients();
  return (
    clients && (
      <div
        className={
          "relative px-2.5 w-full max-w-[1200px] rounded-[10px] bg-midnight mb-20 md:bg-eclipse md:py-9 md:px-[50px]"
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
