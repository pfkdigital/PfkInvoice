import React from "react";
import { InvoiceItemType } from "@/types/invoiceitem";
import Image from "next/image";
import BagIcon from "@/../public/bag.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceItemTableProps {
  headers: string[];
  items: InvoiceItemType[];
}

const InvoiceItemTable = ({ headers, items }: InvoiceItemTableProps) => {
  const renderHeaders = () => {
    return headers.map((header, index) => (
      <TableHead
        className="text-sm font-normal leading-4 text-snowWhite"
        key={index}
      >
        {header}
      </TableHead>
    ));
  };

  const renderItems = (data: InvoiceItemType[]) => {
    return data.map((item, index) => (
      <TableRow
        className={"w-full h-auto bg-midnight md:bg-midnight md:mt-2.5"}
        key={index}
      >
        <TableCell
          className={
            "text-smokeGray text-[12px] leading-[14.4px] text-left overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.id}
        </TableCell>
        <TableCell
          className={
            "text-smokeGray text-[12px] leading-[14.4px] text-left overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          {item.name}
        </TableCell>
        <TableCell
          className={
            "text-smokeGray text-[12px] leading-[14.4px] whitespace-nowrap text-ellipsis"
          }
        >
          {item.quantity}
        </TableCell>
        <TableCell
          className={
            "text-smokeGray text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis"
          }
        >
          ${item.price}
        </TableCell>
        <TableCell className={"text-smokeGray text-[12px] leading-[14.4px]"}>
          ${item.total}
        </TableCell>
      </TableRow>
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
      <Table
        className={"gap-y-2.5 border-separate gap-x-2.5 border-spacing-y-2"}
      >
        <TableHeader>
          <TableRow>{headers && renderHeaders()}</TableRow>
        </TableHeader>
        <TableBody className={"border-spacing-2.5"}>
          {items && renderItems(items)}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceItemTable;
