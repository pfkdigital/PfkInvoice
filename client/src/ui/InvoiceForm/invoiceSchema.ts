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

const InvoiceItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});

export const InvoiceSchema = z.object({
  invoiceReference: z.string(),
  createdAt: z.string(),
  paymentDue: z.string().optional(),
  description: z.string().optional(),
  paymentTerms: z.number(),
  invoiceStatus: z.string().optional(),
  total: z.number(),
  client: ClientSchema.optional(),
  invoiceItems: z.array(InvoiceItemSchema),
});

type ClientAddressType = z.infer<typeof ClientAddressSchema>;
type ClientType = z.infer<typeof ClientSchema>;
type InvoiceItemType = z.infer<typeof InvoiceItemSchema>;
type NewInvoiceType = z.infer<typeof InvoiceSchema>;
