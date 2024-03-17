import React from "react";
import InvoiceForm from "@/ui/InvoiceForm/InvoiceForm";
import { getAllClients } from "@/lib/api-functions";
import InvoiceTitleBar from "@/ui/InvoiceTitleBar/InvoiceTitleBar";

const Page = async () => {
  const clients = await getAllClients();
  return (
    <div
      className={
        "max-w-[1000px] w-full h-fit rounded-[20px] md:bg-eclipse md:pb-7"
      }
    >
      <InvoiceTitleBar type={"create"} />
      <div className={"mx-2.5 mt-4 md:px-4"}>
        {clients && <InvoiceForm clients={clients} type={"create"} />}
      </div>
    </div>
  );
};

export default Page;
