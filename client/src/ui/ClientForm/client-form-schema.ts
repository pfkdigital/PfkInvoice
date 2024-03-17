import { z } from "zod";

const clientFormSchema = z.object({
  clientName: z.string(),
  clientAddress: z.object({
    street: z.string(),
    city: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;
