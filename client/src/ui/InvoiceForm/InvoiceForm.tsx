"use client";

import React, { useEffect, useState } from "react";
import { ClientType } from "@/types/client.types";
import { DatePicker } from "@/ui/DatePicker/DatePicker";
import { paymentTermsData } from "@/lib/payment-terms";
import ProductEditor from "@/ui/ProductEditor/ProductEditor";
import { InvoiceDetailsType } from "@/types/invoice.types";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvoiceSchemaType,
  InvoiceSchema,
  ClientSchemaType,
} from "@/lib/form-schemas";
import generateInvoiceReference from "@/lib/generate-invoice-reference";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type InvoiceFormProps = {
  type: "create" | "edit";
  invoiceToEdit?: InvoiceDetailsType;
  clients?: ClientType[];
};

const InvoiceForm = ({ clients, invoiceToEdit, type }: InvoiceFormProps) => {
  const [total, setTotal] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedClient, setSelectedClient] = useState<ClientSchemaType>(
    invoiceToEdit?.client || ({} as ClientSchemaType),
  );
  const isEditMode = type === "edit";
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<InvoiceSchemaType>({
    resolver: zodResolver(InvoiceSchema),
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "invoiceItems",
  });
  const selectedClientId = watch("clientId");
  const router = useRouter();

  useEffect(() => {
    if (isEditMode && invoiceToEdit) {
      setValue("description", invoiceToEdit.description);
      setValue("invoiceReference", invoiceToEdit.invoiceReference);
      setValue("paymentTerms", invoiceToEdit.paymentTerms);
      setValue("paymentDue", invoiceToEdit.paymentDue);
      setValue("invoiceStatus", invoiceToEdit.invoiceStatus);
      setValue("total", invoiceToEdit.total);
      setValue("createdAt", invoiceToEdit.createdAt);
      setValue("clientId", invoiceToEdit.client.id);
      setValue("invoiceItems", invoiceToEdit.invoiceItems);
    }
  }, [invoiceToEdit, isEditMode, setValue]);

  useEffect(() => {
    const total = fields.reduce((acc, item) => acc + item.total, 0);
    setTotal(total);
  }, [fields]);

  useEffect(() => {
    if (selectedDate) {
      setValue("paymentDue", selectedDate);
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedClientId) {
      const currentClient = clients?.find(
        (client) => client.id === +selectedClientId,
      );

      if (currentClient) {
        setSelectedClient(currentClient);
      }
    }
  }, [selectedClientId]);

  const renderClientsOptions = () => {
    return clients?.map((client) => (
      <option key={client.id} value={+client.id}>
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

  const submit = handleSubmit(async (data: InvoiceSchemaType) => {
    setValue("client", selectedClient);
    setValue("clientId", undefined);
    try {
      if (isEditMode) {
        const payload = getValues();
        const response = await fetch(`/api/invoices/${invoiceToEdit?.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success(response.json());
        router.push(`/invoices/${invoiceToEdit?.id}`);
      } else {
        const formattedDate = format(new Date(), "yyyy-MM-dd");
        setValue("total", total);
        setValue("invoiceReference", generateInvoiceReference());
        setValue("createdAt", formattedDate);
        const payload = getValues();
        const response = await fetch("/api/invoices", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success(response.json());
        router.push("/invoices");
      }
    } catch (e) {
      toast.error("An error occurred. Please try again.");
    }
  });

  return (
    <>
      <form id="invoice-form" onSubmit={submit}>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-2.5 md:flex md:justify-start">
          <p className="text-base text-snowWhite md:col-span-2 md:hidden">
            {isEditMode ? "Edit Invoice" : "New Invoice"}
          </p>
          <select
            className="h-[30px] w-30 px-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10 md:w-[130px] md:order-2 md:ml-2.5"
            required
            {...register("invoiceStatus", {
              required: true,
            })}
          >
            <option value={invoiceToEdit?.client.id} className="text-cloudGray">
              {"Payment Status"}
            </option>
            <option value="Unpaid" className="text-cloudGray">
              Unpaid
            </option>
            <option value="Paid" className="text-cloudGray">
              Paid
            </option>
          </select>
          <input
            className="col-span-2 h-[30px] pl-4 bg-eclipse text-snowWhite text-xs placeholder:text-snowWhite md:bg-midnight md:h-10 md:w-[350px]"
            type="text"
            placeholder={"Invoice Description"}
            {...register("description", { required: true })}
          />
          <div className="w-full col-span-2 grid grid-cols-2 grid-rows-1 gap-x-2.5 mb-2.5 md:my-0 md:flex md:justify-end md:col-span-1 md:order-3">
            <DatePicker
              label="Payment Due"
              isEditMode={isEditMode}
              setValue={setValue}
            />
            <select
              className="h-[30px] w-full pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10 md:w-[130px]"
              {...register("paymentTerms", {
                required: true,
                valueAsNumber: true,
              })}
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
        <div className="w-full md:hidden">
          <select
            className="h-[30px] w-full pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            placeholder={
              isEditMode ? invoiceToEdit?.client.clientName : "Client"
            }
            {...register("clientId", {
              required: true,
            })}
          >
            <option value={invoiceToEdit?.client.id}>Select Client</option>
            {renderClientsOptions()}
          </select>
        </div>
      </form>
      <div className="md:grid grid-rows-1 grid-cols-invoice-form md:gap-x-2.5">
        <ProductEditor
          fields={fields}
          append={append}
          remove={remove}
          update={update}
          invoiceItems={getValues("invoiceItems")}
        />
        <div className="md:grid grid-rows-2 grid-cols-1">
          <div className="w-full">
            <select
              className="hidden h-[30px] w-full pl-4 bg-eclipse text-snowWhite text-xs md:block md:bg-midnight md:h-10 md:relative md:top-[54px]"
              placeholder={
                isEditMode ? invoiceToEdit?.client.clientName : "Client"
              }
              {...register("clientId", {
                required: true,
              })}
            >
              <option>Select Client</option>
              {renderClientsOptions()}
            </select>
          </div>
          <div className="w-full h-auto flex justify-end md:items-end">
            <div className="w-40 flex justify-center items-center bg-oceanBlue rounded-[10px] md:w-full md:h-10">
              <p className="text-base text-cloudGray font-bold">Total:</p>
              <p className="ml-4 text-cloudGray text-base font-bold">{`$ ${total}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
