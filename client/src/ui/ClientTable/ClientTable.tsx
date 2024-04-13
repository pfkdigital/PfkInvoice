"use client";

import React, { memo } from "react";
import { ClientType } from "@/types/client.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { useRouter } from "next/navigation";
import ControlRow from "@/ui/ClientTable/ControlRow";

interface ClientTableProps {
  headers: string[];
  clients: ClientType[];
  showControlRow: boolean;
}

const ClientTable = ({
  headers,
  clients,
  showControlRow,
}: ClientTableProps) => {
  const router = useRouter();
  const tableCellStyle =
    "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis p-3";

  const handleClick = (id: number) => {
    router.push(`/clients/${id}`);
  };

  return (
    <>
      {showControlRow && <ControlRow />}
      <div
        className={
          "w-full overflow-x-scroll no-scrollbar no-scrollbar::-webkit-scrollbar"
        }
      >
        <Table
          className={
            "text-snowWhite gap-y-2.5 border-separate gap-x-2.5 border-spacing-y-2"
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
            {clients.map((item) => (
              <TableRow
                className={
                  "h-auto bg-eclipse mb-2.5 cursor-pointer md:bg-midnight"
                }
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <TableCell className={`${tableCellStyle} `}>
                  {item.clientName}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.clientEmail}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.clientAddress.street}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.clientAddress.city}
                </TableCell>
                <TableCell className={tableCellStyle}>
                  {item.clientAddress.postcode}
                </TableCell>
                <TableCell className={`${tableCellStyle}`}>
                  {item.clientAddress.country}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default memo(ClientTable);
