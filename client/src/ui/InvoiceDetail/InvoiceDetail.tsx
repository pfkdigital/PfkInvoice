import React from "react";
import { InvoiceDetailsType } from "@/types/invoice.types";
import InvoiceItemTable from "@/ui/InvoiceItemTable/InvoiceItemTable";
import { invoiceItemHeaders } from "@/app/lib/tableHeaders";

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
    <div
      className={
        "w-full flex-col md:grid md:grid-cols-invoice-grid md:grid-rows-1 md:pb-10 md:gap-x-8 md:p-10"
      }
    >
      {/*Reference Area + Invoice Item*/}
      <div className={"flex-col justify-end h-full"}>
        <div
          className={"flex justify-start bg-eclipse p-5 rounded-[10px] md:p-0"}
        >
          <div className={"flex-col"}>
            <p className={"text-base text-cloudGray md:text-3xl"}>
              <span className={"hidden md:inline-block"}>Invoice:</span>
              {` ${invoiceReference}`}
            </p>
            <p className={"text-xs italic text-snowWhite md:text-sm"}>
              {description}
            </p>
          </div>
          <div
            className={
              "ml-2.5 px-4 py-2.5 bg-oceanBlue text-xs text-cloudGray max-h-5 rounded-[10px] flex items-center justify-center font-bold"
            }
          >
            <span>{invoiceStatus}</span>
          </div>
          <div className={"flex-col ml-auto"}>
            <div className={"grid grid-cols-2"}>
              <p className={"text-xs text-cloudGray font-bold md:text-sm"}>
                Created
              </p>
              <p className={"text-xs text-smokeGray md:text-sm"}>{createdAt}</p>
            </div>
            <div className={"grid grid-cols-2"}>
              <p className={"text-xs text-cloudGray font-bold md:text-sm"}>
                Due Date
              </p>
              <p className={"text-xs text-smokeGray md:text-sm"}>
                {paymentDue}
              </p>
            </div>
          </div>
        </div>
        <div className={"hidden md:flex"}>
          <InvoiceItemTable headers={invoiceItemHeaders} items={invoiceItems} />
        </div>
      </div>
      {/*Client Area + Total*/}
      <div className={"flex-col relative"}>
        <div
          className={
            "bg-eclipse rounded-[10px] mt-2.5 p-5 md:bg-midnight md:h-fit md:mb-[70px] md:mt-0 md:min-w-[181px]"
          }
        >
          <div className={"w-full border-b-midnight border-b pb-2 mb-2"}>
            <p className={"text-base text-cloudGray md:text-xl"}>Client</p>
          </div>
          <div
            className={"grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 md:mb-4"}
          >
            <p className={"text-oceanBlue text-sm font-bold"}>Name</p>
            <p className={"text-xs text-smokeGray md:text-sm"}>
              {client.clientName}
            </p>
          </div>
          <div
            className={"grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 md:mb-4"}
          >
            <p className={"text-oceanBlue text-sm font-bold"}>Email</p>
            <p className={"text-xs text-smokeGray md:text-sm"}>
              {client.clientEmail}
            </p>
          </div>
          <div className={"grid grid-cols-2 md:grid-cols-1 md:grid-rows-2"}>
            <p className={"text-oceanBlue text-sm font-bold"}>Country</p>
            <p className={"text-xs text-smokeGray md:text-sm"}>
              {client.clientAddress.country}
            </p>
          </div>
        </div>
        <div
          className={
            "hidden absolute bottom-0 left-0 w-full  justify-center items-center bg-oceanBlue rounded-[10px] md:flex md:justify-between md:px-4 md:h-[30px]"
          }
        >
          <p className={"text-base text-cloudGray font-bold"}>Total:</p>
          <p
            className={"ml-4 text-cloudGray text-base font-bold"}
          >{`$ ${total}`}</p>
        </div>
      </div>
      <div className={"bg-eclipse rounded-[10px] mt-2.5 p-2.5 md:hidden"}>
        <InvoiceItemTable headers={invoiceItemHeaders} items={invoiceItems} />
      </div>
      <div className={"w-full flex justify-end md:hidden"}>
        <div
          className={
            "w-40 flex justify-center bg-oceanBlue m-2.5 rounded-[10px]"
          }
        >
          <p className={"text-base text-cloudGray font-bold"}>Total:</p>
          <p
            className={"ml-4 text-cloudGray text-base font-bold"}
          >{`$ ${total}`}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
