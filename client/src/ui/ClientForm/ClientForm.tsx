"use client";

import React, { useEffect } from "react";
import { ClientWithInvoices } from "@/types/client.types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ClientFormSchema, ClientFormSchemaType } from "./clientFormSchema";
import { Form } from "@/components/form";
import InputField from "@/ui/InputField/InputField";

type ClientFormProps = {
  deleted?: boolean;
  id?: number;
  type: "edit" | "create";
  client?: ClientWithInvoices;
};

const ClientForm = ({ client, id, type }: ClientFormProps) => {
  const isEditMode = type === "edit";
  const router = useRouter();

  const form = useForm<ClientFormSchemaType>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      clientName: client?.clientName || "",
      clientEmail: client?.clientEmail || "",
      clientAddress: {
        street: client?.clientAddress?.street || "",
        city: client?.clientAddress?.city || "",
        postcode: client?.clientAddress?.postcode || "",
        country: client?.clientAddress?.country || "",
      },
    },
  });

  const { setValue, handleSubmit } = form;

  useEffect(() => {
    if (isEditMode && !client) {
      toast.error("Client not found");
      router.push("/clients");
    }
    if (isEditMode && client?.clientAddress) {
      setValue("clientName", client.clientName);
      setValue("clientEmail", client.clientEmail);
      setValue("clientAddress.street", client.clientAddress.street);
      setValue("clientAddress.city", client.clientAddress.city);
      setValue("clientAddress.postcode", client.clientAddress.postcode);
      setValue("clientAddress.country", client.clientAddress.country);
    }
  }, [client, isEditMode, router, setValue]);

  const onSubmit = async (data: ClientFormSchemaType) => {
    try {
      const url = isEditMode ? `/api/clients/${id}` : "/api/clients";
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      toast.success(result);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
    router.push("/clients");
  };

  return (
    <div className={"max-w-[768px] mx-auto md:pb-5 md:max-w-full md:mx-0"}>
      <Form {...form}>
        <form
          className={"flex-col"}
          id={"client-form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={
              "grid grid-rows-2 gap-y-1.5 mt-2.5 mb-5 md:grid-cols-2 md:gap-x-7 md:grid-rows-1 md:mb-7"
            }
          >
            <InputField
              form={form}
              inputName={"clientName"}
              label={"Client Name"}
              placeholder={"Enter client name"}
              description={"Client name is required"}
            />
            <InputField
              form={form}
              inputName={"clientEmail"}
              label={"Client Email"}
              placeholder={"Enter client email"}
              description={"Client email is required"}
            />
          </div>
          <div className={"my-1.25"}>
            <p className={"text-base text-cloudGray"}>Address</p>
          </div>
          <div
            className={
              "grid grid-rows-4 gap-y-1.5 mt-2.5 md:grid-cols-2 md:grid-rows-2 md:gap-x-7 md:gap-y-2.5"
            }
          >
            <InputField
              form={form}
              inputName={"clientAddress.street"}
              label={"Client street"}
              placeholder={"Enter street name"}
              description={"Client street address is required"}
            />
            <InputField
              form={form}
              inputName={"clientAddress.city"}
              label={"Client city"}
              placeholder={"Enter city"}
              description={"Client city is required"}
            />
            <InputField
              form={form}
              inputName={"clientAddress.postcode"}
              label={"Client postcode"}
              placeholder={"Enter postcode"}
              description={"Client postcode is required"}
            />
            <InputField
              form={form}
              inputName={"clientAddress.country"}
              label={"Client country"}
              placeholder={"Enter country name"}
              description={"Client country is required"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientForm;
