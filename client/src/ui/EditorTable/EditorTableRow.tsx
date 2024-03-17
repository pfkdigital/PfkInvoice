"use client";

import React from "react";
import { ItemTableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BinIcon from "../../../public/bin.svg";
import EditIcon from "../../../public/edit.svg";
import { UseFieldArrayRemove } from "react-hook-form";

interface EditorTableRowProps {
  id: any;
  name: string;
  quantity: number;
  price: number;
  total: number;
  remove: UseFieldArrayRemove;
  setValue: any;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const EditorTableRow = ({
  id,
  name,
  quantity,
  price,
  total,
  remove,
  setValue,
  isEditing,
  setEditing,
  selectedIndex,
  setSelectedIndex,
}: EditorTableRowProps) => {
  const handleEditItem = () => {
    setEditing(true);
    setValue("name", name);
    setValue("quantity", quantity);
    setValue("price", price);
    setSelectedIndex(id);
  };

  return (
    <TableRow
      className={
        "w-full h-fit grid grid-cols-5 grid-rows-1 bg-eclipse p-[10px] mb-[10px] md:p-0 md:grid-cols-5 md:bg-midnight md:mt-2.5 md:px-2.5 last:mb-0"
      }
    >
      <ItemTableCell
        className={
          "text-smokeGray text-[12px] leading-[14.4px] text-left overflow-hidden whitespace-nowrap text-ellipsis md:my-auto"
        }
      >
        {name}
      </ItemTableCell>
      <ItemTableCell
        className={
          "text-smokeGray text-[12px] leading-[14.4px] text-center whitespace-nowrap text-ellipsis md:text-center md:my-auto"
        }
      >
        {quantity}
      </ItemTableCell>
      <ItemTableCell
        className={
          "w-full text-smokeGray text-[12px] leading-[14.4px] text-center overflow-hidden whitespace-nowrap text-ellipsis md:block md:my-auto"
        }
      >
        ${price}
      </ItemTableCell>
      <ItemTableCell
        className={
          "w-full text-smokeGray text-[12px] leading-[14.4px] text-right md:flex justify-end md:my-auto"
        }
      >
        ${total}
      </ItemTableCell>
      <ItemTableCell
        className={
          "w-full text-smokeGray text-[12px] leading-[14.4px] text-right flex justify-end md:my-auto"
        }
      >
        {id === selectedIndex && isEditing ? (
          <Button variant={"ghost"} size={"tableIcon"} type={"button"}>
            <Image
              src={BinIcon}
              alt={"bin-icon"}
              width={12}
              height={12}
              className={"cursor-pointer"}
              onClick={() => remove(id)}
            />
          </Button>
        ) : (
          <Button variant={"ghost"} type={"button"} size={"tableIcon"}>
            <Image
              src={EditIcon}
              alt={"edit-icon"}
              width={12}
              height={12}
              className={"cursor-pointer"}
              onClick={handleEditItem}
            />
          </Button>
        )}
      </ItemTableCell>
    </TableRow>
  );
};

export default EditorTableRow;
