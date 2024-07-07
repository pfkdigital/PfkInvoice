import { NextRequest, NextResponse } from "next/server";
import { deleteClientById, updateClientById } from "@/lib/api-functions";
import { ClientFormSchema } from "@/ui/ClientForm/clientFormSchema";

// Update Client By ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const payload = await req.json();
  const parsed = ClientFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      parsed.error.errors.map((error) => error),
      { status: 400 },
    );
  }

  try {
    const clientId = +params.id;
    await updateClientById(clientId, payload);

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
