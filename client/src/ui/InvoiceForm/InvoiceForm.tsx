"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { ClientType } from "@/types/client.types";
import { DatePicker } from "@/ui/DatePicker/DatePicker";
import { paymentTermsData } from "@/app/lib/payment-terms";
import ProductEditor from "@/ui/ProductEditor/ProductEditor";
import { InvoiceItemType } from "@/types/invoiceitem";
import generateInvoiceReference from "@/app/lib/generate-invoice-reference";
import getCurrentDate from "@/app/lib/generate-date";
import { createInvoice } from "@/app/lib/api-functions";
import { InvoiceDetailsType, NewInvoiceDto } from "@/types/invoice.types";

type InvoiceFormProps = {
  type: "create" | "edit";
  invoiceToEdit?: InvoiceDetailsType;
  clients?: ClientType[];
};

const InvoiceForm = ({ clients, invoiceToEdit, type }: InvoiceFormProps) => {
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [paymentTerms, setPaymentTerms] = useState<number>();
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>(
    undefined,
  );
  const [client, setClient] = useState<ClientType>();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItemType[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [editItem, setEditItem] = useState<InvoiceItemType | {}>({});

  const isEditMode = !!(type === "edit" && invoiceToEdit);

  useEffect(() => {
    if (isEditMode && invoiceToEdit) {
      setDescription(invoiceToEdit.description);
      setInvoiceItems(invoiceToEdit.invoiceItems);
      setSelectedDate(invoiceToEdit.paymentDue);
      setInvoiceStatus(invoiceStatus);
      setSelectedDate(invoiceToEdit.paymentDue);
      setPaymentTerms(invoiceToEdit.paymentTerms);
      setClient(invoiceToEdit.client);
      setInvoiceItems(invoiceToEdit.invoiceItems);
    }
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [invoiceItems]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInvoiceStatus(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handlePaymentTermsChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentTerms(+event.target.value);
  };

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = clients?.find(
      (client) => client.id === +event.target.value,
    );
    setSelectedClientId(+event.target.value);
    setClient(selectedClient);
  };
  const handleProductNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const addItems = () => {
    const newItem: InvoiceItemType = {
      id: invoiceItems.length + 1,
      name: productName,
      quantity: +quantity,
      price: +price,
      total: +quantity * +price,
    };
    setInvoiceItems((prevState) =>
      prevState ? [...prevState, newItem] : [newItem],
    );
    handleCancel();
  };

  const handleEdit = (id: number, editedItems: InvoiceItemType) => {
    const editedList = invoiceItems.map((item) => {
      if (item.id === id) {
        return {
          id,
          name: productName,
          quantity: +quantity,
          price: +price,
          total: +quantity * +price,
        };
      } else {
        return item;
      }
    });
    setInvoiceItems(editedList);
  };

  const deleteItem = (id: number) => {
    const filteredItems = invoiceItems.filter((item) => item.id !== id);
    setInvoiceItems(filteredItems);
    setEditItem({});
  };
  const renderClientsOptions = () => {
    return clients?.map((client) => (
      <option key={client.id} value={client.id}>
        {client.clientName}
      </option>
    ));
  };

  const renderPaymentTerms = () => {
    return paymentTermsData.map((term, index) => (
      <option key={index} value={term}>
        {term}
      </option>
    ));
  };

  const calculateTotal = () => {
    const total = invoiceItems.reduce((acc, item) => acc + item.total, 0);
    setTotal(total);
  };

  const handleCancel = () => {
    setProductName("");
    setPrice("");
    setQuantity("");
    setEditItem({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const items = invoiceItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
    }));

    if (isEditMode && invoiceToEdit) {
      const editedInvoice: NewInvoiceDto = {
        invoiceReference: invoiceToEdit?.invoiceReference,
        createdAt: invoiceToEdit.createdAt,
        paymentDue:
          invoiceToEdit.paymentDue === selectedDate
            ? invoiceToEdit.paymentDue
            : selectedDate,
        description:
          invoiceToEdit.description === description
            ? invoiceToEdit.description
            : description,
        paymentTerms: invoiceToEdit.paymentTerms
          ? invoiceToEdit.paymentTerms
          : paymentTerms,
        invoiceStatus: invoiceToEdit.invoiceStatus
          ? invoiceToEdit.invoiceStatus
          : invoiceStatus,
        total,
        client:
          invoiceToEdit.client.id === client?.id
            ? invoiceToEdit.client
            : client,
        invoiceItems: items,
      };
      console.log(editedInvoice);
    } else {
      const invoiceReference = `INV-${generateInvoiceReference()}`;
      const createdAt = getCurrentDate();

      const newInvoice: NewInvoiceDto = {
        invoiceReference,
        createdAt,
        paymentDue: selectedDate,
        description,
        paymentTerms,
        invoiceStatus,
        total,
        client,
        invoiceItems: items,
      };

      try {
        const response = await createInvoice(newInvoice);
        console.log(response);
      } catch (e) {
        console.log(e);
        throw Error("Failed to create new invoice");
      }
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} id={"new-invoice-form"}>
        <div
          className={
            "grid grid-cols-2 grid-rows-2 gap-y-2.5 md:flex md:justify-start"
          }
        >
          <p className={"text-base text-snowWhite md:col-span-2 md:hidden"}>
            {type === "edit" ? "Edit Invoice" : "New Invoice"}
          </p>
          <select
            name="invoiceStatus"
            className={
              "rounded-[10px] h-[30px] w-30 px-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10 md:w-[130px] md:order-2 md:ml-2.5"
            }
            value={invoiceStatus}
            onChange={handleStatusChange}
            required
          >
            <option value="" className={"text-cloudGray"}>
              {isEditMode && invoiceToEdit
                ? invoiceToEdit.invoiceStatus
                : "Payment Status"}
            </option>
            <option value="Unpaid" className={"text-cloudGray"}>
              Unpaid
            </option>
            <option value="Paid" className={"text-cloudGray"}>
              Paid
            </option>
          </select>
          <input
            type="text"
            className={
              "rounded-[10px] col-span-2 h-[30px] pl-4 bg-eclipse text-snowWhite text-xs placeholder:text-snowWhite md:bg-midnight md:h-10 md:w-[350px]"
            }
            placeholder={isEditMode ? invoiceToEdit.description : "Description"}
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <div
            className={
              "w-full col-span-2 grid grid-cols-2 grid-rows-1 gap-x-2.5 mb-2.5 md:my-0 md:flex md:justify-end md:col-span-1 md:order-3"
            }
          >
            <DatePicker
              label={"Date"}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              isEditMode={isEditMode}
            />
            <select
              value={paymentTerms}
              className={
                "rounded-[10px] h-[30px] w-full pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10 md:w-[130px]"
              }
              onChange={handlePaymentTermsChange}
              required
            >
              <option value="">
                {isEditMode
                  ? `${invoiceToEdit?.paymentTerms}`
                  : "Payment Terms"}
              </option>
              {renderPaymentTerms()}
            </select>
          </div>
        </div>
        <div className={"w-full md:hidden"}>
          <select
            placeholder={
              isEditMode ? invoiceToEdit?.client.clientName : "Client"
            }
            className={
              "rounded-[10px] h-[30px] w-full pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
            onChange={handleClientChange}
            value={selectedClientId}
          >
            <option value="">
              {isEditMode ? invoiceToEdit?.client.clientName : "Client"}
            </option>
            {renderClientsOptions()}
          </select>
        </div>
      </form>
      <div
        className={"md:grid grid-rows-1 grid-cols-invoice-form md:gap-x-2.5"}
      >
        <ProductEditor
          deleteItem={deleteItem}
          items={invoiceItems}
          setItems={setInvoiceItems}
          editItem={editItem}
          setEditItem={setEditItem}
          addItems={addItems}
          productName={productName}
          setProductName={setProductName}
          price={price}
          setPrice={setPrice}
          quantity={quantity}
          setQuantity={setQuantity}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handlePriceChange={handlePriceChange}
          handleProductNameChange={handleProductNameChange}
          handleQuantityChange={handleQuantityChange}
        />
        <div className={"md:grid grid-rows-2 grid-cols-1"}>
          <div className={"w-full"}>
            <select
              className={
                "hidden rounded-[10px] h-[30px] w-full pl-4 bg-eclipse text-snowWhite text-xs md:block md:bg-midnight md:h-10 md:relative md:top-[54px]"
              }
              onChange={handleClientChange}
              value={selectedClientId}
            >
              <option value="">
                {isEditMode ? invoiceToEdit?.client.clientName : "Client"}
              </option>
              {renderClientsOptions()}
            </select>
          </div>
          <div className={"w-full h-auto flex justify-end md:items-end"}>
            <div
              className={
                "w-40 flex justify-center items-center bg-oceanBlue rounded-[10px] md:w-full md:h-10"
              }
            >
              <p className={"text-base text-cloudGray font-bold"}>Total:</p>
              <p
                className={"ml-4 text-cloudGray text-base font-bold"}
              >{`$ ${total}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
