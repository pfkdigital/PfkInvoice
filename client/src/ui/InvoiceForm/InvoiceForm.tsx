"use client";

import React, { useEffect, useState } from "react";
import { ClientType } from "@/types/client.types";
import { DatePicker } from "@/ui/DatePicker/DatePicker";
import { paymentTermsData } from "@/lib/payment-terms";
import ProductEditor from "@/ui/ProductEditor/ProductEditor";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClientSchemaType,
  InvoiceSchemaType,
  InvoiceSchema,
} from "./invoiceSchema";
import generateInvoiceReference from "@/lib/generate-invoice-reference";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/form";
import { SelectItem } from "@/components/select";
import SelectField from "../SelectField/SelectField";
import InputField from "@/ui/InputField/InputField";

type InvoiceFormProps = {
  type: "create" | "edit";
  invoiceToEdit?: InvoiceSchemaType;
  clients?: ClientType[];
};

const InvoiceForm = ({ clients, invoiceToEdit, type }: InvoiceFormProps) => {
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedClient, setSelectedClient] = useState<ClientSchemaType>(
    invoiceToEdit?.client || ({} as ClientSchemaType),
  );

  const isEditMode = type === "edit";

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      description: invoiceToEdit?.description,
      invoiceReference: invoiceToEdit?.invoiceReference,
      paymentTerms: invoiceToEdit?.paymentTerms,
      paymentDue: invoiceToEdit?.paymentDue,
      invoiceStatus: invoiceToEdit?.invoiceStatus,
      total: invoiceToEdit?.total,
      createdAt: invoiceToEdit?.createdAt,
      clientId: invoiceToEdit?.client?.id,
      invoiceItems: invoiceToEdit?.invoiceItems,
    },
  });
  const { control, register, handleSubmit, watch, setValue, getValues } = form;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "invoiceItems",
  });
  const selectedClientId = watch("clientId");

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
  }, [clients, selectedClientId]);

  const renderInvoiceStatus = () => {
    return (
      <>
        <SelectItem value="Unpaid">Unpaid</SelectItem>
        <SelectItem value="Paid">Paid</SelectItem>
      </>
    );
  };

  const renderClientsOptions = () => {
    return (
      <>
        {clients?.map((client) => (
          <SelectItem key={client.id} value={`${client.id}`}>
            {client.clientName}
          </SelectItem>
        ))}
      </>
    );
  };

  const renderPaymentTerms = () => {
    return (
      <>
        {paymentTermsData.map((term, index) => (
          <SelectItem key={index} value={`${term}`}>
            {term}
          </SelectItem>
        ))}
      </>
    );
  };

  const submit = handleSubmit(async (data: InvoiceSchemaType) => {
    setValue("client", selectedClient);
    setValue("clientId", undefined);

    const url = isEditMode
      ? `/api/invoices/${invoiceToEdit?.id}`
      : "/api/invoices";
    const method = isEditMode ? "PUT" : "POST";

    if (!isEditMode) {
      const formattedDate = format(new Date(), "yyyy-MMM-dd");
      setValue("total", total);
      setValue("invoiceReference", generateInvoiceReference());
      setValue("createdAt", formattedDate);
    }

    const payload = getValues();

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method,
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      toast.success(result);

      if (isEditMode) {
        router.push(`/invoices/${invoiceToEdit?.id}`);
      } else {
        router.push("/invoices");
      }
    } catch (e) {
      console.error(e);
      toast.error(`An error occurred`);
    }
  });

  return (
    <div className={"max-w-[768px] mx-auto md:max-w-full md:mx-0"}>
      <Form {...form}>
        <form id="invoice-form" onSubmit={submit}>
          <div className="grid grid-cols-2 grid-rows-2 gap-y-2.5 md:flex md:justify-start">
            <p className="text-base text-snowWhite md:col-span-2 md:hidden">
              {isEditMode ? "Edit Invoice" : "New Invoice"}
            </p>
            <SelectField
              fieldName="invoiceStatus"
              fieldLabel="Payment Status"
              placeholder="Status"
              form={form}
              options={renderInvoiceStatus}
              styles={
                "h-[30px] min-w-[135px] md:h-10 md:w-[130px] md:order-2 md:ml-2.5"
              }
            />
            <div className={"col-span-2"}>
              <InputField
                form={form}
                inputName="description"
                label=""
                placeholder="Invoice Description"
                description="Invoice description is required"
                className={
                  "h-[30px] w-full grid-cold pl-4 text-snowWhite text-sm placeholder:text-snowWhite md:h-10 md:w-[350px]"
                }
                type={"text"}
              />
            </div>
            <div className="w-full col-span-2 grid grid-cols-2 grid-rows-1 gap-x-2.5 mb-2.5 md:my-0 md:flex md:justify-end md:col-span-1 md:order-3">
              <DatePicker
                label="Payment Due"
                isEditMode={isEditMode}
                setValue={setValue}
              />
              <SelectField
                fieldName="paymentTerms"
                fieldLabel="Payment Terms"
                placeholder={
                  isEditMode
                    ? `${invoiceToEdit?.paymentTerms}`
                    : "Payment Terms"
                }
                form={form}
                options={renderPaymentTerms}
                styles={"min-w-[135px]"}
              />
            </div>
          </div>
          <div className="w-full md:hidden">
            <SelectField
              fieldName="clientId"
              fieldLabel="Client"
              placeholder={
                isEditMode ? invoiceToEdit?.client?.clientName : "Client"
              }
              form={form}
              options={renderClientsOptions}
            />
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
            <SelectField
              fieldName="clientId"
              fieldLabel="Client"
              placeholder={
                isEditMode ? invoiceToEdit?.client?.clientName : "Client"
              }
              form={form}
              options={renderClientsOptions}
              styles={"w-full h-10 hidden md:block md:relative md:top-[54px]"}
            />
            <div className="w-full h-auto flex justify-end md:items-end">
              <div className="w-40 flex justify-center items-center bg-oceanBlue rounded-[10px] md:w-full md:h-10">
                <p className="text-base text-cloudGray font-bold">Total:</p>
                <p className="ml-4 text-cloudGray text-base font-bold">{`$ ${total}`}</p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default InvoiceForm;
