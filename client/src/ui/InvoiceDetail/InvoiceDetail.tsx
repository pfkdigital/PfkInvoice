import React from "react";
import { InvoiceDetailsType } from "@/types/invoice.types";
import { invoiceItemHeaders } from "@/lib/tableHeaders";
import InvoiceItemTable from "@/ui/InvoiceItemTable/InvoiceItemTable";
import StatusBadge from "@/ui/InvoiceDetail/StatusBadge";
import ClientDetailsRow from "@/ui/InvoiceDetail/ClientDetailsRow";
import TotalDisplay from "@/ui/InvoiceDetail/TotalDisplay";

type InvoiceDetailProps = InvoiceDetailsType;

const InvoiceDetail = ({
  invoiceReference,
  description,
  createdAt,
  paymentDue,
  client,
  invoiceStatus,
  invoiceItems,
  total,
}: InvoiceDetailProps) => {
  return (
    <div className="w-full flex-col md:grid md:grid-cols-invoice-grid md:grid-rows-1 md:pb-10 md:gap-x-8">
      <div className="flex-col justify-end h-full">
        <div className="flex justify-start bg-eclipse p-5 rounded-[10px] md:p-0">
          <div className="flex-col md:pb-2.5">
            <div className="flex justify-between items-start md:items-center">
              <p className="text-base text-cloudGray md:text-3xl">
                <span className="hidden md:inline-block">Invoice:</span>{" "}
                {invoiceReference}
              </p>
              <StatusBadge status={invoiceStatus} />
            </div>
            <p className="text-xs italic text-snowWhite md:text-sm">
              {description}
            </p>
          </div>
          <div className="flex-col ml-auto">
            <ClientDetailsRow label="Created" value={createdAt} />
            <ClientDetailsRow label="Due Date" value={paymentDue} />
          </div>
        </div>
        <div className="hidden md:flex overflow-x-scroll no-scrollbar">
          <InvoiceItemTable headers={invoiceItemHeaders} items={invoiceItems} />
        </div>
      </div>
      <div className="flex-col relative md:w-full">
        <div className="bg-eclipse rounded-[10px] mt-2.5 p-5 md:bg-midnight md:h-fit md:mb-[70px] md:mt-0 md:p-5">
          <div className="w-full border-b-midnight border-b pb-2 mb-2">
            <p className="text-base text-cloudGray md:text-xl">Client</p>
          </div>
          <ClientDetailsRow label="Name" value={client?.clientName} />
          <ClientDetailsRow label="Email" value={client?.clientEmail} />
          <ClientDetailsRow
            label="Country"
            value={client?.clientAddress?.country}
          />
        </div>
        <TotalDisplay total={total} />
      </div>
      <div className="bg-eclipse rounded-[10px] mt-2.5 p-2.5 md:hidden">
        <InvoiceItemTable headers={invoiceItemHeaders} items={invoiceItems} />
      </div>
      <div className="w-full flex justify-end md:hidden">
        <div className="w-40 flex justify-center bg-oceanBlue m-2.5 rounded-[10px]">
          <p className="text-base text-cloudGray font-bold">Total:</p>
          <p className="ml-4 text-cloudGray text-base font-bold">{`$ ${total}`}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
