import React from "react";
import { getAllClients, getInvoiceById } from "@/lib/api-functions";
import InvoiceForm from "@/ui/InvoiceForm/InvoiceForm";
import InvoiceTitleBar from "@/ui/InvoiceTitleBar/InvoiceTitleBar";
import { unstable_noStore as noStore } from "next/cache";

const Page = async ({ params }: { params: { id: string } }) => {
  noStore();

  const invoiceId = +params.id;
  const invoice = await getInvoiceById(invoiceId);
  const clients = await getAllClients();
  return (
    <div
      className={
        "max-w-[1000px] w-full h-fit rounded-[20px] md:bg-eclipse md:pb-7"
      }
    >
      <InvoiceTitleBar invoiceId={invoiceId} type={"edit"} />
      <div className={"mx-2.5 mt-4 md:p-4"}>
        {clients && invoice && (
          <InvoiceForm
            clients={clients}
            invoiceToEdit={invoice}
            type={"edit"}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
