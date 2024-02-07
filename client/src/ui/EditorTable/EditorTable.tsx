import React, { Dispatch, SetStateAction } from "react";
import { InvoiceItemType } from "@/types/invoiceitem";
import Image from "next/image";
import EditIcon from "@/../public/edit.svg";
import BinIcon from "@/../public/bin.svg";
import { Button } from "@/components/ui/button";

interface EditorTableProps {
  items: InvoiceItemType[];
  isEditMode: boolean;
  editItem: Partial<InvoiceItemType>;
  setEditItem: Dispatch<SetStateAction<Partial<InvoiceItemType>>>;
  deleteItem: (id: number) => void;
}

const EditorTable = ({
  items,
  isEditMode,
  editItem,
  setEditItem,
  deleteItem,
}: EditorTableProps) => {
  const renderItems = (data: InvoiceItemType[]) => {
    return data.map((item) => (
      <tr
        className={
          "w-full grid grid-cols-5 grid-rows-1 h-auto bg-eclipse rounded-[7px] p-[10px] mb-[10px] md:p-0 md:grid-cols-5 md:bg-midnight md:mt-2.5 md:px-2.5 md:py-2.5 last:mb-0"
        }
        key={item.id}
      >
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
        <td
          className={
            "w-full text-smokeGray text-[12px] leading-[14.4px] text-right flex justify-end"
          }
        >
          {isEditMode && editItem.id === item.id ? (
            <Button
              variant={"ghost"}
              size={"tableIcon"}
              onClick={() => deleteItem(item.id)}
            >
              <Image
                src={BinIcon}
                alt={"bin-icon"}
                width={16}
                height={16}
                className={"cursor-pointer"}
              />
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              onClick={() =>
                setEditItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                })
              }
              size={"tableIcon"}
            >
              <Image
                src={EditIcon}
                alt={"edit-icon"}
                width={16}
                height={16}
                className={"cursor-pointer"}
              />
            </Button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="w-full max-h-auto rounded-[20px] md:bg-eclipse">
      <table className="w-full max-w-[1388px] h-auto">
        <tbody>{items && renderItems(items)}</tbody>
      </table>
    </div>
  );
};

export default EditorTable;
