import React from "react";
import {
  InvoiceItemSchemaType,
  InvoiceSchemaType,
} from "../InvoiceForm/invoiceSchema";
import { Table, TableBody } from "@/components/table";
import EditorTableRow from "@/ui/EditorTable/EditorTableRow";
import {
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReset,
} from "react-hook-form";

interface EditorTableProps {
  items: Array<InvoiceItemSchemaType>;
  remove: UseFieldArrayRemove;
  reset: UseFormReset<InvoiceItemSchemaType>;
  update: UseFieldArrayUpdate<InvoiceSchemaType>;
  setValue: any;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const EditorTable = ({
  items,
  isEditing,
  remove,
  reset,
  setValue,
  selectedIndex,
  setEditing,
  setSelectedIndex,
}: EditorTableProps) => {
  const renderItems = (data: InvoiceItemSchemaType[]) => {
    return data.map((item, index) => (
      <EditorTableRow
        id={index}
        name={item.name}
        quantity={item.quantity}
        price={item.price}
        total={item.total}
        key={index}
        remove={remove}
        reset={reset}
        setValue={setValue}
        isEditing={isEditing}
        setEditing={setEditing}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    ));
  };

  return (
    <div className="w-full max-h-auto rounded-[20px] md:bg-eclipse">
      <Table className="w-full max-w-[1388px] h-auto">
        <TableBody>{items && renderItems(items)}</TableBody>
      </Table>
    </div>
  );
};

export default EditorTable;
