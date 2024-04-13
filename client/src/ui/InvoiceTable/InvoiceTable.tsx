"use client";

import React, { memo, useEffect, useState } from "react";
import { InvoiceType } from "@/types/invoice.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Link from "next/link";
import Image from "next/image";
import PlusIcon from "../../../public/plus.svg";
import FilterBox from "@/ui/FilterBox/FilterBox";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";

interface TableProps {
  headers: string[];
  invoices: InvoiceType[];
  showFilterRow: boolean;
  lightRows?: boolean;
}

const InvoiceTable = ({
  invoices,
  headers,
  showFilterRow,
  lightRows,
}: TableProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentStatusFilter, setCurrentStatusFilter] = useState<
    "Paid" | "Unpaid" | ""
  >("");

  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceType[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (invoices) {
      const filteredResults = invoices.filter(
        (invoice) => invoice.invoiceStatus === currentStatusFilter,
      );
      setFilteredInvoices(filteredResults);
    }
  }, [currentStatusFilter, invoices]);

  const tableCellStyle =
    "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis p-3";
  const tableRowStyle = lightRows
    ? "h-auto bg-eclipse mb-2.5 md:bg-midnight cursor-pointer"
    : "h-auto bg-eclipse mb-2.5 cursor-pointer md:bg-midnight";

  const dataToDisplay =
    filteredInvoices.length > 0 ? filteredInvoices : invoices;

  const handleClick = (id: number) => {
    router.push(`/invoices/${id}`);
  };

  return (
    <>
      {showFilterRow && (
        <div className="w-full flex justify-between items-center mb-5">
          <div className="w-auto md:w-[100px]">
            <Link href={"/invoices/new"}>
              <Button size={"sm"}>
                <Image
                  src={PlusIcon}
                  alt="add-icon"
                  height={15}
                  width={15}
                  className="mr-[5px]"
                />
                Invoice
              </Button>
            </Link>
          </div>
          <FilterBox
            isVisible={showFilters}
            toggleVisibility={setShowFilters}
            statusFilter={currentStatusFilter}
            setStatusFilter={setCurrentStatusFilter}
          />
        </div>
      )}
      <div
        className={
          "w-full overflow-x-scroll no-scrollbar no-scrollbar::-webkit-scrollbar"
        }
      >
        <Table
          className={
            "w-full text-snowWhite gap-y-2.5 border-separate gap-x-2.5 border-spacing-y-2"
          }
        >
          <TableHeader
            className={
              "hidden border-y-2 border-y-eclipse md:table-header-group"
            }
          >
            <TableRow className={"h-auto bg-midnight mb-2.5 md:bg-eclipse"}>
              {headers.map((item, index) => (
                <TableHead
                  className={"overflow-hidden whitespace-nowrap text-ellipsis"}
                  key={index}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToDisplay.map((item) => (
              <TableRow
                className={tableRowStyle}
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <TableCell
                  className={`${tableCellStyle} round-tl-[10px] round-tr-[10px]`}
                >
                  {item.invoiceReference}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.createdAt}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.clientName}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.description}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.paymentTerms}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.paymentDue}
                </TableCell>
                <TableCell className={tableCellStyle}>£ {item.total}</TableCell>
                <TableCell
                  className={
                    item.invoiceStatus === "Paid"
                      ? `text-oceanBlue`
                      : `text-smokeGray`
                  }
                >
                  {item.invoiceStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default memo(InvoiceTable);
