import { InvoiceItem } from "@/types/invoiceitem";
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

export interface InvoiceDetailsType extends InvoiceType {
  client: ClientType;
  invoiceItems: InvoiceItem[];
}
