import React from "react";
import { getAllClients, getInvoiceById } from "@/app/lib/api-functions";
import InvoiceForm from "@/ui/InvoiceForm/InvoiceForm";
import TitleBar from "@/ui/TitleBar/TitleBar";

const Page = async ({ params }: { params: { id: string } }) => {
  const invoiceId = +params.id;
  const invoice = await getInvoiceById(invoiceId);
  const clients = await getAllClients();

  return (
    <div
      className={
        "max-w-[873px] w-full h-fit mt-[16px] rounded-[20px] md:mx-[10px] md:bg-eclipse md:pb-7"
      }
    >
      <TitleBar itemId={invoiceId} />
      <div className={"mx-2.5 mt-4 md:px-4"}>
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
