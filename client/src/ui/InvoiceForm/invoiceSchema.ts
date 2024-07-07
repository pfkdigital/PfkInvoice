import { z } from "zod";

const ClientAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postcode: z.string(),
  country: z.string(),
});

const ClientSchema = z.object({
  id: z.number().optional(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientAddress: ClientAddressSchema,
});

export const InvoiceItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});

export const InvoiceSchema = z.object({
  id: z.number().optional(),
  invoiceReference: z.string(),
  createdAt: z.string(),
  paymentDue: z.string().optional(),
  description: z.string().optional(),
  paymentTerms: z.number(),
  invoiceStatus: z.string().optional(),
  total: z.number(),
  client: ClientSchema.optional(),
  clientId: z.number().optional(),
  invoiceItems: z.array(InvoiceItemSchema),
});
export type InvoiceItemSchemaType = z.infer<typeof InvoiceItemSchema>;
export type ClientAddressType = z.infer<typeof ClientAddressSchema>;
export type ClientSchemaType = z.infer<typeof ClientSchema>;
export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;
