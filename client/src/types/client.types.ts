import { InvoiceType } from "@/types/invoice.types";

interface ClientAddressType {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface ClientType {
  id: number;
  clientName: string;
  clientEmail: string;
  clientAddress: ClientAddressType;
}

interface ClientWithInvoices extends ClientType {
  invoices: InvoiceType[];
}
