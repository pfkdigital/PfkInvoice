"use client";

import React, { useState } from "react";
import { InvoiceDetailsType, InvoiceType } from "@/types/invoice.types";
import { ClientType } from "@/types/client.types";
import Table from "@/app/ui/Table/Table";
import { clientHeaders, invoicesHeaders } from "@/app/ui/Table/tableHeaders";

interface LatestContainerProps {
  invoices: InvoiceType[];
  clients: ClientType[];
}

const LatestContainer = ({ invoices, clients }: LatestContainerProps) => {
  const [showInvoices, setShowInvoices] = useState(true);
  return (
    <div className={"w-full h-auto bg-midnight rounded-[10px] my-[10px]"}>
      <div className={"mx-[5px]"}>
        <div className={"flex justify-between mb-[10px] md:hidden"}>
          <div
            className={`w-1/2 h-10 flex justify-center items-center rounded-[10px] mr-[5px] cursor-pointer ${
              showInvoices ? "bg-oceanBlue" : "bg-eclipse"
            }`}
            onClick={() => setShowInvoices(true)}
          >
            <span className={"text-base text-snowWhite"}>Latest Invoices</span>
          </div>
          <div
            className={`w-1/2 h-10 flex justify-center items-center rounded-[10px] cursor-pointer ${
              showInvoices ? "bg-eclipse" : "bg-oceanBlue"
            }`}
            onClick={() => setShowInvoices(false)}
          >
            <span className={"text-base text-snowWhite "}>Latest Clients</span>
          </div>
        </div>
        <div className={"rounded-[20px] md:bg-eclipse"}>
          {showInvoices ? (
            <Table header={invoicesHeaders} data={invoices} type={"invoice"} />
          ) : (
            <Table header={clientHeaders} data={clients} type={"client"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestContainer;
