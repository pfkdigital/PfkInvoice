import { z } from "zod";

export const ClientAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postcode: z.string(),
  country: z.string(),
});

export const ClientSchema = z.object({
  id: z.number(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientAddress: ClientAddressSchema,
});

export const InvoiceItemSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});

export const InvoiceSchema = z.object({
  invoiceReference: z.string().optional(),
  invoiceStatus: z.string(),
  createdAt: z.coerce.string().optional(),
  description: z.coerce.string(),
  paymentDue: z.coerce.string(),
  paymentTerms: z.coerce.number(),
  clientId: z.coerce.number().optional(),
  client: ClientSchema.optional(),
  invoiceItems: InvoiceItemSchema.array(),
  total: z.number().optional(),
});

export type ClientSchemaType = z.infer<typeof ClientSchema>;
export type InvoiceItemType = z.infer<typeof InvoiceItemSchema>;
export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;
