import { NextRequest, NextResponse } from "next/server";
import { deleteInvoiceById, editInvoiceById } from "@/lib/api-functions";
import { InvoiceDetailsType } from "@/types/invoice.types";
import { revalidatePath } from "next/cache";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const payload = (await req.json()) as InvoiceDetailsType;
  try {
    await editInvoiceById(payload, +params.id);
    revalidatePath("/invoices");
    revalidatePath("/clients");

    return NextResponse.json("Invoice was successfully updated", {
      status: 201,
    });
  } catch (e) {
    return NextResponse.json("Invoice not updated", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await deleteInvoiceById(+params.id);
    revalidatePath("/invoices");
    return NextResponse.json("Invoice was successfully deleted", {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json("Invoice not deleted", { status: 500 });
  }
};
