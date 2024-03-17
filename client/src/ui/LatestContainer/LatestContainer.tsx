"use client";

import React, { useState } from "react";
import { InvoiceType } from "@/types/invoice.types";
import { ClientType } from "@/types/client.types";
import { clientHeaders, invoicesHeaders } from "@/lib/tableHeaders";
import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import ClientTable from "@/ui/ClientTable/ClientTable";
import Link from "next/link";

interface LatestContainerProps {
  invoices: InvoiceType[];
  clients: ClientType[];
}

const LatestContainer = ({ invoices, clients }: LatestContainerProps) => {
  const [showInvoices, setShowInvoices] = useState(true);
  return (
    <div
      className={
        "w-full h-auto bg-midnight rounded-[10px] mt-2.5 max-w-[1400px]"
      }
    >
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
      <div className={"rounded-[20px] md:bg-eclipse md:hidden"}>
        {showInvoices ? (
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={invoices}
            lightRows={false}
            showFilterRow={false}
          />
        ) : (
          <ClientTable
            headers={clientHeaders}
            clients={clients}
            showControlRow={false}
          />
        )}
      </div>
      <div className={"hidden md:grid md:grid-cols-latest-container-column"}>
        <div className={"bg-eclipse rounded-[10px] px-5 py-5"}>
          <div className={"w-full flex justify-between text-snowWhite "}>
            <p className={"font-bold"}>Latest Invoices</p>
            <Link href={"/invoices"} className={"font-bold"}>
              View All
            </Link>
          </div>
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={invoices}
            lightRows={false}
            showFilterRow={false}
          />
        </div>
        <div className={"bg-eclipse h-fit rounded-[10px] ml-2.5 px-5 py-5"}>
          <div className={"w-full flex justify-between text-snowWhite"}>
            <p className={"font-bold"}>Latest Clients</p>
            <Link href={"/clients"} className={"font-bold"}>
              View All
            </Link>
          </div>
          <div className={"overflow-x-scroll"}>
            <ClientTable
              headers={clientHeaders}
              clients={clients}
              showControlRow={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestContainer;
