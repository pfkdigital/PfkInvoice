"use server";

import {
  InvoiceDetailsType,
  InvoiceType,
  NewInvoiceDto,
} from "@/types/invoice.types";
import {
  ClientDTOType,
  ClientType,
  ClientWithInvoices,
} from "@/types/client.types";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { request } from "http";

const invoiceUrl = "http://localhost:8080/api/v1/invoices";
const clientUrl = "http://localhost:8080/api/v1/clients";

export const getInvoiceCount = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/count`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getInvoiceRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/total`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getUnpaidRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/unpaid/total`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getClientCount = async () => {
  try {
    const response = await fetch(`${clientUrl}/count`, {
      next: { revalidate: 10 },
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAllInvoices = async (): Promise<InvoiceType[] | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}`, { next: { revalidate: 10 } });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAllClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${clientUrl}`, { next: { revalidate: 10 } });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getInvoiceById = async (
  invoiceId: number,
): Promise<InvoiceDetailsType | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getClientById = async (
  clientId: number,
): Promise<ClientWithInvoices | undefined> => {
  try {
    const response = await fetch(`${clientUrl}/${clientId}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const updateClientById = async (
  clientId: number,
  updatedClient: ClientDTOType,
) => {
  try {
    const response = await fetch(`${clientUrl}/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClient),
      next: { revalidate: 10 },
    });
    revalidatePath("/clients");
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const createClient = async (data: ClientDTOType) => {
  try {
    const response = await fetch(`${clientUrl}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      method: "POST",
    });
    revalidatePath("/clients");
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const createInvoice = async (data: NewInvoiceDto) => {
  try {
    const response = await fetch(`${invoiceUrl}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      method: "POST",
    });
    revalidatePath("/invoices");
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const editInvoice = async (data: NewInvoiceDto, invoiceId: number) => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "PATCH",
    });
    revalidatePath("/invoices");
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const deleteInvoice = async (invoiceId: number) => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`, {
      method: "DELETE",
    });
    revalidatePath("/invoices");
    NextResponse.redirect(new URL("/invoices"));
    return response.json();
  } catch (e) {}
};
