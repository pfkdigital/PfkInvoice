"use client";

import React, { useEffect } from "react";
import { ClientWithInvoices } from "@/types/client.types";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

type ClientFormProps = {
  deleted?: boolean;
  id?: number;
  type: "edit" | "create";
  client?: ClientWithInvoices;
};

export const ClientSchema = z.object({
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientAddress: z.object({
    street: z.string(),
    city: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
});

type ClientFormSchema = z.infer<typeof ClientSchema>;

const ClientForm = ({ client, deleted, id, type }: ClientFormProps) => {
  const isEditMode = type === "edit";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      clientName: client?.clientName,
      clientEmail: client?.clientEmail,
      clientAddress: {
        street: client?.clientAddress.street,
        city: client?.clientAddress.city,
        postcode: client?.clientAddress.postcode,
        country: client?.clientAddress.country,
      },
    },
  });

  useEffect(() => {
    if (isEditMode && !client) {
      toast.error("Client not found");
      router.push("/clients");
    }
    if (isEditMode && client) {
      setValue("clientName", client.clientName);
      setValue("clientEmail", client.clientEmail);
      setValue("clientAddress.street", client.clientAddress.street);
      setValue("clientAddress.city", client.clientAddress.city);
      setValue("clientAddress.postcode", client.clientAddress.postcode);
      setValue("clientAddress.country", client.clientAddress.country);
    }
  }, [client, isEditMode]);

  const onSubmit = async (data: ClientFormSchema) => {
    try {
      const url = isEditMode ? `/api/clients/${id}` : "/api/clients";
      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
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
    <div className={"px-2.5 md:pb-5 md:px-0"}>
      <form
        className={"flex-col"}
        id={"client-form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"my-1.25 md:hidden"}>
          <p className={"text-base text-cloudGray"}>Client: {id}</p>
        </div>
        <div
          className={
            "grid grid-rows-2 gap-y-1.5 mt-2.5 mb-5 md:grid-cols-2 md:gap-x-7 md:grid-rows-1 md:mb-7"
          }
        >
          <Input
            type="text"
            placeholder={"Client Name"}
            {...register("clientName", { required: true })}
            disabled={deleted}
          />
          <Input
            type="email"
            placeholder={"Client email address"}
            {...register("clientEmail", { required: true })}
            disabled={deleted}
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
          <Input
            type="text"
            placeholder={"Client Street"}
            {...register("clientAddress.street", { required: true })}
            disabled={deleted}
          />
          <Input
            type="text"
            placeholder={"Client City"}
            {...register("clientAddress.city", { required: true })}
            disabled={deleted}
          />
          <Input
            type="text"
            placeholder={"Client Postcode"}
            {...register("clientAddress.postcode", { required: true })}
            disabled={deleted}
          />
          <Input
            type="text"
            placeholder={"Client Country"}
            {...register("clientAddress.country", { required: true })}
            disabled={deleted}
          />
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
