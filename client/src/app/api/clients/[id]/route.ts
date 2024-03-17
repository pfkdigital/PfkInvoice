import { NextRequest, NextResponse } from "next/server";
import { deleteClientById, updateClientById } from "@/lib/api-functions";
import { revalidatePath } from "next/cache";
import { ClientDTOType } from "@/types/client.types";

// Update Client By ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const payload = (await req.json()) as ClientDTOType;
  try {
    const clientId = +params.id;
    await updateClientById(clientId, payload as unknown as ClientDTOType);
    revalidatePath("/clients");
    revalidatePath(`/clients/${clientId}`);
    return NextResponse.json("Client was successfully updated", {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json("Client not updated", { status: 500 });
  }
}

// Delete Client By ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const clientId = +params.id;
    await deleteClientById(clientId);
    revalidatePath("/clients");
    revalidatePath("/invoices");
    return NextResponse.json(
      { message: "Client was successfully deleted" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Client not deleted" },
      { status: 500 },
    );
  }
}
