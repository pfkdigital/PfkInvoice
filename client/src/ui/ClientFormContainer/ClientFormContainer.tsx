"use client";

import React, { useState } from "react";
import ClientTitleBar from "@/ui/ClientTitleBar/ClientTitleBar";
import ClientForm from "@/ui/ClientForm/ClientForm";
import { ClientWithInvoices } from "@/types/client.types";

interface ClientFormContainerProps {
  client?: ClientWithInvoices;
  clientId?: number;
  type: "edit" | "create";
}

const ClientFormContainer = ({
  client,
  clientId,
  type,
}: ClientFormContainerProps) => {
  const [deleted, setDeleted] = useState(false);
  return <></>;
};

export default ClientFormContainer;
