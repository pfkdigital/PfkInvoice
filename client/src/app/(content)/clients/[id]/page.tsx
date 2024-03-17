import { getClientById } from "@/lib/api-functions";
import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "@/lib/tableHeaders";
import ClientDetail from "@/ui/ClientDetail/ClientDetail";
import ClientTitleBar from "@/ui/ClientTitleBar/ClientTitleBar";

const Page = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className={"flex-col max-w-[1000px] w-full"}>
      <div className={"w-full h-fit rounded-[20px] md:p-5 md:bg-eclipse"}>
        <ClientTitleBar type={"view"} clientId={clientId} />
        <div>
          {client && client?.clientAddress && (
            <ClientDetail
              id={clientId}
              clientName={client.clientName}
              clientEmail={client.clientEmail}
              clientAddress={client.clientAddress}
            />
          )}
        </div>
      </div>
      {client && client.invoices.length > 0 ? (
        <div
          className={
            "w-full h-fit mt-[16px] p-4 bg-eclipse rounded-[20px] md:px-7 md:pb-7"
          }
        >
          <p className={"text-base text-cloudGray md:hidden"}>Clint Invoices</p>
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={client?.invoices}
            showFilterRow={false}
            lightRows={false}
          />
        </div>
      ) : (
        <div className="w-full mt-[16px] p-4 bg-eclipse rounded-[20px] text-cloudGray text-base flex justify-center items-center h-full">
          No invoices associated with this client.
        </div>
      )}
    </div>
  );
};

export default Page;
