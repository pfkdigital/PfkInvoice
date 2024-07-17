import { ClientType, ClientWithInvoices } from "@/types/client.types";
import {
  InvoiceDetailsType,
  InvoiceType,
  NewInvoiceType,
} from "@/types/invoice.types";
import { ClientFormSchemaType } from "@/ui/ClientForm/clientFormSchema";
import { CLIENT_URL, INVOICE_URL } from "@/lib/constants";

export const getInvoiceCount = async () => {
  try {
    const response = await fetch(`${INVOICE_URL}/count`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getInvoiceRevenue = async () => {
  try {
    const response = await fetch(`${INVOICE_URL}/total`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getUnpaidRevenue = async () => {
  try {
    const response = await fetch(`${INVOICE_URL}/unpaid/total`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getClientCount = async () => {
  try {
    const response = await fetch(`${CLIENT_URL}/count`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getAllInvoices = async (): Promise<InvoiceType[] | undefined> => {
  try {
    const response = await fetch(`${INVOICE_URL}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getLatestInvoices = async (): Promise<
  InvoiceType[] | undefined
> => {
  try {
    const response = await fetch(`${INVOICE_URL}/latest`);
    const invoices = await response.json();
    return invoices;
  } catch (e) {
    console.error(e);
  }
};

export const getGraphData = async () => {
  try {
    const response = await fetch(`${INVOICE_URL}/graph`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getInvoiceById = async (
  invoiceId: number,
): Promise<InvoiceDetailsType | undefined> => {
  try {
    const response = await fetch(`${INVOICE_URL}/${invoiceId}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getAllClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${CLIENT_URL}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getLatestClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${CLIENT_URL}/latest`);
    const clients = await response.json();
    return clients;
  } catch (e) {
    console.error(e);
  }
};

export const getClientById = async (
  clientId: number,
): Promise<ClientWithInvoices | undefined> => {
  try {
    const response = await fetch(`${CLIENT_URL}/${clientId}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const updateClientById = async (
  clientId: number,
  updatedClient: ClientFormSchemaType,
) => {
  try {
    const response = await fetch(`${CLIENT_URL}/${clientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClient),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const createClient = async (data: ClientFormSchemaType) => {
  try {
    const response = await fetch(`${CLIENT_URL}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      method: "POST",
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const deleteClientById = async (clientId: number) => {
  try {
    const response = await fetch(`${CLIENT_URL}/${clientId}`, {
      method: "DELETE",
    });
    return response.text();
  } catch (e) {
    console.error(e);
  }
};

export const createInvoice = async (data: NewInvoiceType) => {
  try {
    const response = await fetch(`${INVOICE_URL}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      method: "POST",
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const editInvoiceById = async (
  data: InvoiceDetailsType,
  invoiceId: number,
) => {
  try {
    const response = await fetch(`${INVOICE_URL}/${invoiceId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "PUT",
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const deleteInvoiceById = async (invoiceId: number) => {
  try {
    const response = await fetch(`${INVOICE_URL}/${invoiceId}`, {
      method: "DELETE",
    });

    return response.text();
  } catch (e) {
    console.error(e);
  }
};
