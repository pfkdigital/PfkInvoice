import {InvoiceDetailsType, InvoiceType} from "@/types/invoice.types";
import { ClientType } from "@/types/client.types";

const invoiceUrl = "http://localhost:8080/api/v1/invoices";
const clientUrl = "http://localhost:8080/api/v1/clients";

export const getInvoiceCount = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/count`);
    const result = response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getInvoiceRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/total`);
    const result = response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getUnpaidRevenue = async () => {
  try {
    const response = await fetch(`${invoiceUrl}/unpaid/total`);
    const result = response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getClientCount = async () => {
  try {
    const response = await fetch(`${clientUrl}/count`);
    const result = response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getAllInvoices = async (): Promise<InvoiceType[] | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAllClients = async (): Promise<ClientType[] | undefined> => {
  try {
    const response = await fetch(`${clientUrl}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getInvoiceById = async (invoiceId: number):Promise<InvoiceDetailsType | undefined> => {
  try {
    const response = await fetch(`${invoiceUrl}/${invoiceId}`);
    return response.json()
  } catch (e) {
    console.log(e)
  }
}
