import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { InvoiceItemType } from "@/types/invoiceitem";
import ProductIcon from "@/../public/bag.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditorTable from "@/ui/EditorTable/EditorTable";

interface ProductEditorProps {
  items: InvoiceItemType[];
  editItem: Partial<InvoiceItemType>;
  setEditItem: Dispatch<SetStateAction<Partial<InvoiceItemType>>>;
  setItems: Dispatch<SetStateAction<InvoiceItemType[]>>;
  productName: string;
  setProductName: Dispatch<SetStateAction<string>>;
  quantity: string;
  setQuantity: Dispatch<SetStateAction<string>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  handleCancel: () => void;
  handleEdit: (id: number, editedItems: InvoiceItemType) => void;
  handleProductNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleQuantityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addItems: () => void;
  deleteItem: (id: number) => void;
}

const ProductEditor = ({
  deleteItem,
  editItem,
  items,
  productName,
  quantity,
  price,
  handleCancel,
  handleEdit,
  handleProductNameChange,
  handleQuantityChange,
  handlePriceChange,
  addItems,
  setEditItem,
}: ProductEditorProps) => {
  const isEditMode = editItem.id !== undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode) {
      console.log("hello");
    } else {
      addItems();
    }
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className={
        "flex-col justify-between bg-midnight py-2.5 mt-2.5 md:bg-eclipse md:pb-0"
      }
    >
      <div className={"flex w-full ml-2.5"}>
        <Image
          src={ProductIcon}
          alt={"product-icon"}
          width={12}
          height={15}
          className={"mr-2"}
        />
        <p className={"text-base text-cloudGray"}>Products</p>
      </div>
      <div
        className={
          "bg-eclipse p-2.5 my-2.5 rounded-[10px] w-full md:bg-midnight md:mb-0"
        }
      >
        <div className={"flex justify-between"}>
          <p className={"text-base text-cloudGray"}>
            {editItem.id ? `Edit item : ${editItem.id}` : "New Item"}
          </p>
          <div className={"flex"}>
            {isEditMode ? (
              <>
                <Button variant={"default"} size={"sm"} className={"mr-2.5"}>
                  Edit
                </Button>
                <Button
                  variant={"default"}
                  size={"sm"}
                  type={"button"}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant={"default"} size={"sm"} type={"submit"}>
                Save
              </Button>
            )}
          </div>
        </div>
        <div>
          <div className={"mt-2.5 mb-1.5 w-full flex"}>
            <Input
              type="text"
              className={
                "w-full rounded-[10px] border-0 h-[30px] pl-4 bg-midnight text-snowWhite text-xs placeholder:text-snowWhite md:bg-eclipse md:h-10"
              }
              placeholder={editItem.name ? editItem.name : "Product Name"}
              value={productName}
              defaultValue={editItem.name}
              onChange={handleProductNameChange}
              required
            />
          </div>
          <div className={"grid grid-cols-2 gap-x-2.5"}>
            <Input
              type="text"
              className={
                "w-full rounded-[10px] border-0 h-[30px] pl-4 bg-midnight text-snowWhite text-xs placeholder:text-snowWhite md:bg-eclipse md:h-10"
              }
              placeholder={
                editItem.quantity ? `${editItem.quantity}` : "Quantity"
              }
              defaultValue={editItem.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              required
            />
            <Input
              type="text"
              className={
                "w-full rounded-[10px] border-0 h-[30px] pl-4 bg-midnight text-snowWhite text-xs placeholder:text-snowWhite md:bg-eclipse md:h-10"
              }
              placeholder={editItem.price ? `${editItem.price}` : "Price"}
              value={price}
              defaultValue={editItem.price}
              onChange={handlePriceChange}
              required
            />
          </div>
        </div>
      </div>
      {items && (
        <EditorTable
          items={items}
          setEditItem={setEditItem}
          editItem={editItem}
          isEditMode={isEditMode}
          deleteItem={deleteItem}
        />
      )}
    </form>
  );
};

export default ProductEditor;
