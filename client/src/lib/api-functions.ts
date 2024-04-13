import {
  ClientDTOType,
  ClientType,
  ClientWithInvoices,
} from "@/types/client.types";
import {
  InvoiceDetailsType,
  InvoiceType,
  NewInvoiceType,
} from "@/types/invoice.types";

const invoiceUrl = "http://localhost:8080/api/v1/invoices";
const clientUrl = "http://localhost:8080/api/v1/clients";

export const getInvoiceCount = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/count`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getInvoiceRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/total`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getUnpaidRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/unpaid/total`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getClientCount = async () => {
  try {
    const response = await fetch(`${clientUrl}/count`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getAllInvoices = async (): Promise<InvoiceType[] | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getLatestInvoices = async (): Promise<
  InvoiceType[] | undefined
> => {
  try {
    const response = await fetch(`${invoiceUrl}/latest`);
    const invoices = await response.json();
    return invoices;
  } catch (e) {
    console.error(e);
  }
};

export const getInvoiceById = async (
  invoiceId: number,
): Promise<InvoiceDetailsType | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getAllClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${clientUrl}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getLatestClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${clientUrl}/latest`);
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
    const response = await fetch(`${clientUrl}/${clientId}`);
    return await response.json();
  } catch (e) {
    console.error(e);
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
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const createClient = async (data: ClientDTOType) => {
  try {
    const response = await fetch(`${clientUrl}`, {
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
    const response = await fetch(`${clientUrl}/${clientId}`, {
      method: "DELETE",
    });
    return response.text();
  } catch (e) {
    console.error(e);
  }
};

export const createInvoice = async (data: NewInvoiceType) => {
  try {
    const response = await fetch(`${invoiceUrl}`, {
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
    const response = await fetch(`${invoiceUrl}/${invoiceId}`, {
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
    const response = await fetch(`${invoiceUrl}/${invoiceId}`, {
      method: "DELETE",
    });

    return response.text();
  } catch (e) {
    console.error(e);
  }
};
