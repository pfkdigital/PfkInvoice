import { InvoiceType } from "@/types/invoice.types";

type ClientAddressType = {
  street: string;
  city: string;
  postcode: string;
  country: string;
};

export type ClientType = {
  id: number;
  clientName: string;
  clientEmail: string;
  clientAddress: ClientAddressType;
};

export type ClientDTOType = Omit<ClientType, "id">;

export interface ClientWithInvoices extends ClientType {
  invoices: InvoiceType[];
}
