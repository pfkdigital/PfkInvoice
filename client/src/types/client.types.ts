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

export type DetailSectionType = {
  title: string;
  data: SectionType[];
};

type SectionType = {
  label: string;
  value: string | number;
};

export type ClientDTOType = Omit<ClientType, "id">;

export interface ClientWithInvoices extends ClientType {
  invoices: InvoiceType[];
}
