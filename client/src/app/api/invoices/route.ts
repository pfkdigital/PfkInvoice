import { NextRequest, NextResponse } from "next/server";
import { createInvoice } from "@/lib/api-functions";
import { revalidatePath } from "next/cache";
import { NewInvoiceType } from "@/types/invoice.types";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const payload = (await req.json()) as NewInvoiceType;
  try {
    const response = await createInvoice(payload);
    revalidatePath("/invoices");
    return NextResponse.json("Invoice was successfully created", {
      status: 201,
    });
  } catch (e) {
    return NextResponse.json("Invoice not created", { status: 500 });
  }
};
