import { z } from "zod";

export const ClientFormSchema = z.object({
  clientName: z.string().trim().min(1, { message: "Name is required" }),
  clientEmail: z
    .string()
    .trim()
    .email()
    .min(1, { message: "Email is required" }),
  clientAddress: z.object({
    street: z.string().trim().min(1, { message: "Street is required" }),
    city: z.string().trim().min(1, { message: "City is required" }),
    postcode: z.string().trim().min(1, { message: "Postcode is required" }),
    country: z.string().trim().min(1, { message: "Country is required" }),
  }),
});

export type ClientFormSchemaType = z.infer<typeof ClientFormSchema>;
