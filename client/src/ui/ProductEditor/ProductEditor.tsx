"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductIcon from "@/../public/bag.svg";
import { Button } from "@/components/button";
import EditorTable from "@/ui/EditorTable/EditorTable";
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvoiceItemSchema,
  InvoiceItemSchemaType,
  InvoiceSchemaType,
} from "../InvoiceForm/invoiceSchema";
import { Form } from "@/components/form";
import InputField from "@/ui/InputField/InputField";

interface ProductEditorProps {
  fields: Array<InvoiceItemSchemaType>;
  append: UseFieldArrayAppend<InvoiceSchemaType>;
  update: UseFieldArrayUpdate<InvoiceSchemaType>;
  remove: UseFieldArrayRemove;
  invoiceItems: InvoiceItemSchemaType[];
}

const ProductEditor = ({
  append,
  remove,
  update,
  fields,
  invoiceItems,
}: ProductEditorProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<InvoiceItemSchemaType>({
    resolver: zodResolver(InvoiceItemSchema),
  });
  const { handleSubmit, watch, reset, getValues, setValue } = form;

  const quantity = watch("quantity", 0);
  const price = watch("price", 0);

  useEffect(() => {
    const total = quantity * price;
    setValue("total", total);
  }, [quantity, price]);

  const submit = handleSubmit((data) => {
    console.log(data);
    append(data);
    reset();
  });

  const handleEditCancel = () => {
    setIsEditing(false);
    reset();
  };

  const handleEdit = () => {
    const currentItem = getValues();
    const itemId = invoiceItems[selectedIndex].id;
    update(selectedIndex, { ...currentItem, id: itemId });
    setIsEditing(false);
    reset();
    return;
  };

  return (
    <Form {...form}>
      <form
        className={
          "flex-col justify-between bg-midnight py-2.5 mt-2.5 md:bg-eclipse md:pb-0"
        }
        onSubmit={submit}
        id={"invoice-item-form"}
      >
        <Button onClick={() => console.log(getValues())}></Button>
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
              {isEditing ? `Edit item` : "New Item"}
            </p>
            <div className={"flex"}>
              {isEditing ? (
                <>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className={"mr-2.5"}
                    type={"button"}
                    onClick={handleEdit}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    type={"button"}
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    type={"submit"}
                    className={"mr-2.5"}
                  >
                    Save
                  </Button>
                  {isEditing && (
                    <Button
                      variant={"default"}
                      size={"sm"}
                      type={"button"}
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            <div className={"w-full flex mt-3 mb-1.5"}>
              <InputField
                form={form}
                inputName="name"
                placeholder="Product Name"
                description="Product name is required"
                className={"min-w-full bg-midnight md:bg-eclipse"}
                type={"text"}
              />
            </div>
            <div className={"grid grid-cols-2 gap-x-2.5"}>
              <InputField
                form={form}
                inputName="quantity"
                placeholder="Quantity"
                description="Quantity is required"
                className={"min-w-full bg-midnight md:bg-eclipse"}
                type={"number"}
              />
              <InputField
                form={form}
                inputName="price"
                placeholder="Price"
                description="Price is required"
                className={"min-w-full bg-midnight md:bg-eclipse"}
                type={"number"}
              />
            </div>
          </div>
        </div>
        <EditorTable
          items={fields}
          remove={remove}
          reset={reset}
          update={update}
          setValue={setValue}
          isEditing={isEditing}
          setEditing={setIsEditing}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </form>
    </Form>
  );
};

export default ProductEditor;
