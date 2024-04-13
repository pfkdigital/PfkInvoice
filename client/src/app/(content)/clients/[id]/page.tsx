import { getClientById } from "@/lib/api-functions";
import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "@/lib/tableHeaders";
import ClientDetail from "@/ui/ClientDetail/ClientDetail";
import ClientTitleBar from "@/ui/ClientTitleBar/ClientTitleBar";
import { unstable_noStore as noStore } from "next/cache";

const Page = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  noStore();
  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className="flex flex-col max-w-[1000px] w-full">
      <div className="w-full h-fit rounded-[20px] md:p-5 md:bg-eclipse">
        <ClientTitleBar type="view" clientId={clientId} />
        {client?.clientAddress && (
          <div className="mx-2.5 md:mx-0">
            <ClientDetail
              id={clientId}
              clientName={client.clientName}
              clientEmail={client.clientEmail}
              clientAddress={client.clientAddress}
            />
          </div>
        )}
      </div>
      {client && client.invoices.length > 0 ? (
        <div className="h-fit mt-4 mx-2.5 p-4 bg-eclipse rounded-[10px] md:px-7 md:pb-7 md:mx-0 md:mt-2.5">
          <p className="text-base text-cloudGray md:hidden">Client Invoices</p>
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={client?.invoices}
            showFilterRow={false}
            lightRows={true}
          />
        </div>
      ) : (
        <div className="mx-2.5 mt-4 p-4 bg-eclipse rounded-[10px] text-cloudGray text-base flex justify-center items-center h-full md:mx-0">
          No invoices associated with this client.
        </div>
      )}
    </div>
  );
};

export default Page;
