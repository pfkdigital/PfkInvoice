import React from "react";
import { InvoiceItemType } from "@/types/invoiceitem";
import Image from "next/image";
import BagIcon from "../../../../public/bag.svg";

interface InvoiceItemTableProps {
  headers: string[];
  items: InvoiceItemType[];
}

const InvoiceItemTable = ({ headers, items }: InvoiceItemTableProps) => {
  const renderHeaders = () => {
    return headers.map((header, index) => (
      <th
        className="w-full flex justify-start item-table-heading last:justify-end text-sm font-normal leading-4 text-snowWhite"
        key={index}
      >
        {header}
      </th>
    ));
  };

  const renderItems = (data: InvoiceItemType[]) => {
    return data.map((item, index) => (
      <tr
        className={
          "w-full grid grid-cols-5 grid-rows-1 h-auto bg-midnight rounded-[7px] p-[10px] mb-[10px] md:p-0 md:grid-cols-5 md:bg-midnight  md:px-2.5 md:py-2.5 last:mb-0"
        }
        key={index}
      >
        <td
          className={
            "text-smokeGray text-[12px] leading-[14.4px] text-left overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.id}
        </td>
        <td
          className={
            "text-smokeGray text-[12px] leading-[14.4px] text-left overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.name}
        </td>
        <td
          className={
            "text-smokeGray text-[12px] leading-[14.4px] text-center whitespace-nowrap text-ellipsis md:text-center"
          }
        >
          {item.quantity}
        </td>
        <td
          className={
            "w-full text-smokeGray text-[12px] leading-[14.4px] text-center overflow-hidden whitespace-nowrap text-ellipsis md:block"
          }
        >
          ${item.price}
        </td>
        <td
          className={
            "w-full text-smokeGray text-[12px] leading-[14.4px] text-right md:flex justify-end"
          }
        >
          ${item.total}
        </td>
      </tr>
    ));
  };

  return (
    <div className="w-full max-h-auto rounded-[20px] md:bg-eclipse">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="w-auto flex justify-start ml-2 md:w-full md:pt-4 md:border-t md:border-t-midnight md:ml-0">
          <Image
            src={BagIcon}
            alt="bag-icon"
            height={15}
            width={15}
            className="mr-[5px]"
          />
          <p className={"text-cloudGray text-base font-normal md:text-[20px]"}>
            Product List
          </p>
        </div>
      </div>
      <table className="w-full max-w-[1388px] h-auto">
        <thead className="hidden mb-[10px] md:flex md:mb-0">
          <tr className="w-full py-[10px] border-t-[1px] border-b-[1px] border-t-midnight border-b-midnight px-[16px] md:grid md:grid-cols-5 md:border-b-0 md:px-2.5">
            {headers && renderHeaders()}
          </tr>
        </thead>
        <tbody>{items && renderItems(items)}</tbody>
      </table>
    </div>
  );
};

export default InvoiceItemTable;
