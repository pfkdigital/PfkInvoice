import { InvoiceItemType, NewItemType } from "@/types/invoiceitem";
import { ClientType } from "@/types/client.types";

export interface InvoiceType {
  id: number;
  invoiceReference: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  invoiceStatus: string;
  total: number;
  clientName: string;
}

export interface InvoiceDetailsType extends Omit<InvoiceType, "clientName"> {
  client: ClientType;
  invoiceItems: InvoiceItemType[];
}

export type NewInvoiceType = {
  invoiceReference: string;
  createdAt: string;
  paymentDue?: string;
  description?: string;
  paymentTerms: number;
  invoiceStatus?: string;
  total: number;
  client?: ClientType;
  invoiceItems: NewItemType[];
};

export type GraphDataType = {
  month: string;
  revenue: number;
};
