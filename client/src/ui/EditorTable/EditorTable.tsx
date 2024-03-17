import React from "react";
import { InvoiceItemType } from "@/types/invoiceitem";
import { Table, TableBody } from "@/components/ui/table";
import EditorTableRow from "@/ui/EditorTable/EditorTableRow";
import { UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";
import { InvoiceSchemaType } from "@/lib/form-schemas";

interface EditorTableProps {
  items: Array<InvoiceItemType>;
  remove: UseFieldArrayRemove;
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
  setValue,
  selectedIndex,
  setEditing,
  setSelectedIndex,
}: EditorTableProps) => {
  const renderItems = (data: InvoiceItemType[]) => {
    return data.map((item, index) => (
      <EditorTableRow
        id={index}
        name={item.name}
        quantity={item.quantity}
        price={item.price}
        total={item.total}
        key={index}
        remove={remove}
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
