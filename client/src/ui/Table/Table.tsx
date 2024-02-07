import React, { memo } from "react";
import { InvoiceType } from "@/types/invoice.types";
import { ClientType } from "@/types/client.types";

interface TableProps {
  header: string[];
  data: (InvoiceType | ClientType)[];
  type: "invoice" | "client";
}

const Table = ({ data, header, type }: TableProps) => {
  const renderHeader = () => {
    return header.map((item, index) => (
      <th
        className={
          "w-full flex justify-start table-heading-cols last:justify-end text-sm font-normal leading-4 text-snowWhite"
        }
        key={index}
      >
        {item}
      </th>
    ));
  };
  const renderClientData = (data: ClientType[]) => {
    return data.map((item, index) => (
      <tr
        key={index}
        className={
          "w-full grid grid-cols-3 h-auto bg-eclipse rounded-[7px] px-[16px] py-[9px] mb-[10px] md:grid-cols-6 md:gap-x-2"
        }
      >
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.clientName}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.clientEmail}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] text-right overflow-hidden whitespace-nowrap text-ellipsis md:text-center"
          }
        >
          {item.clientAddress.country}
        </td>
        <td
          className={
            "w-full text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis hidden md:block"
          }
        >
          {item.clientAddress.city}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis hidden md:block"
          }
        >
          {item.clientAddress.street}
        </td>
        <td
          className={
            "w-full text-snowWhite text-[12px] leading-[14.4px] hidden text-right md:flex justify-end"
          }
        >
          {item.clientAddress.postcode}
        </td>
      </tr>
    ));
  };

  const renderInvoiceData = (data: InvoiceType[]) => {
    return data.map((item, index) => (
      <tr
        key={index}
        className={
          "w-full h-auto grid grid-cols-4 bg-eclipse rounded-[7px] px-[16px] py-[9px] mb-[10px] md:grid-cols-8"
        }
      >
        <td className={"text-snowWhite text-[12px] leading-[14.4px]"}>
          {item.invoiceReference}
        </td>
        <td className={"text-snowWhite text-[12px] leading-[14.4px]"}>
          {item.createdAt}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.clientName}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] hidden md:block overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.description}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] hidden md:flex justify-center"
          }
        >
          {item.paymentTerms}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] hidden md:flex justify-center"
          }
        >
          {item.paymentDue}
        </td>
        <td
          className={
            "text-snowWhite text-[12px] leading-[14.4px] hidden md:flex justify-center"
          }
        >
          ${item.total}
        </td>
        <td
          className={`w-full ${
            item.invoiceStatus === "Paid" ? `text-oceanBlue` : `text-snowWhite`
          } text-[12px] leading-[14.4px] text-right`}
        >
          {item.invoiceStatus}
        </td>
      </tr>
    ));
  };

  return (
    <table
      className={"w-full max-w-[1388px] mb-20 rounded-[20px] md:bg-eclipse"}
    >
      <thead className={"hidden md:flex md:mb-[10px]"}>
        <tr
          className={
            "w-full py-[10px] border-t-[1px] border-b-[1px] border-t-midnight border-b-midnight px-[16px] md:grid md:grid-cols-8"
          }
        >
          {renderHeader()}
        </tr>
      </thead>
      <tbody>
        {type === "invoice"
          ? renderInvoiceData(data as InvoiceType[])
          : renderClientData(data as ClientType[])}
      </tbody>
    </table>
  );
};

export default memo(Table);
