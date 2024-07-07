import { getClientById } from "@/lib/api-functions";
import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "@/lib/tableHeaders";
import ClientDetail from "@/ui/ClientDetail/ClientDetail";
import ClientTitleBar from "@/ui/ClientTitleBar/ClientTitleBar";
import { unstable_noStore as noStore } from "next/cache";

const Page = async ({ params }: { params: { id: number } }) => {
  noStore();

  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className="max-w-[768px] mx-auto flex flex-col md:max-w-[1000px] md:mx-0 w-full">
      <div className="w-full h-fit rounded-[10px] md:p-5 md:bg-eclipse">
        <ClientTitleBar type="view" clientId={clientId} />
        {client?.clientAddress && (
          <>
            <ClientDetail
              id={clientId}
              clientName={client.clientName}
              clientEmail={client.clientEmail}
              clientAddress={client.clientAddress}
            />
          </>
        )}
      </div>
      {client && client.invoices.length > 0 ? (
        <div className="h-fit p-4 bg-eclipse rounded-[10px] md:px-7 md:pb-7 md:mx-0 md:my-2.5">
          <p className="text-base text-cloudGray md:hidden">Client Invoices</p>
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={client.invoices}
            showFilterRow={false}
            lightRows={true}
          />
        </div>
      ) : (
        <div className="mx-2.5 mt-2.5 p-4 bg-eclipse rounded-[10px] text-cloudGray text-base flex justify-center items-center h-full md:mx-0">
          No invoices associated with this client.
        </div>
      )}
    </div>
  );
};

export default Page;
