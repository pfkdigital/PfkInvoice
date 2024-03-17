import {
  ClientDTOType,
  ClientType,
  ClientWithInvoices,
} from "@/types/client.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  InvoiceDetailsType,
  InvoiceType,
  NewInvoiceType,
} from "@/types/invoice.types";
import { NewItemType } from "@/types/invoiceitem";

const invoiceUrl = "http://localhost:8080/api/v1/invoices";
const clientUrl = "http://localhost:8080/api/v1/clients";

export const getInvoiceCount = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/count`, {
      cache: "no-cache",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getInvoiceRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/total`, {
      cache: "no-cache",
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getUnpaidRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/unpaid/total`, {
      cache: "no-cache",
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getClientCount = async () => {
  try {
    const response = await fetch(`${clientUrl}/count`, {
      cache: "no-cache",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAllInvoices = async (): Promise<InvoiceType[] | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}`, { cache: "no-cache" });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getInvoiceById = async (
  invoiceId: number,
): Promise<InvoiceDetailsType | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`, {
      cache: "no-cache",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAllClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${clientUrl}`, { cache: "no-cache" });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getClientById = async (
  clientId: number,
): Promise<ClientWithInvoices | undefined> => {
  try {
    const response = await fetch(`${clientUrl}/${clientId}`);
    return await response.json();
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
    });

    return await response.json();
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

    return await response.json();
  } catch (e) {
    console.log(e);
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
    console.log(e);
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
    console.log(e);
  }
};

export const deleteInvoiceById = async (invoiceId: number) => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`, {
      method: "DELETE",
    });

    return response.text();
  } catch (e) {
    console.log(e);
  }
};

export const createInvoiceItem = async (
  invoiceId: number,
  data: NewItemType,
) => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}/items`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      method: "POST",
      cache: "no-cache",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const editInvoiceItemById = async (
  data: NewItemType,
  invoiceItemId: number,
) => {
  try {
    const response = await fetch(`${invoiceUrl}/items/${invoiceItemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "PUT",
      cache: "no-cache",
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const deleteInvoiceItemById = async (
  invoiceId: number,
  invoiceItemId: number,
) => {
  try {
    const response = await fetch(
      `${invoiceUrl}/${invoiceId}/items/${invoiceItemId}`,
      {
        method: "DELETE",
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
