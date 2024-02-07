export interface InvoiceItemType {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export type NewItemType = Omit<InvoiceItemType, "id">;
