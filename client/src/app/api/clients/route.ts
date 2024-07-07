import { NextRequest, NextResponse } from "next/server";
import { ClientFormSchema } from "@/ui/ClientForm/clientFormSchema";
import { createClient } from "@/lib/api-functions";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const parsed = ClientFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      parsed.error.errors.map((error) => error),
      { status: 400 },
    );
  }

  try {
    await createClient(payload);

    return NextResponse.json("Client was successfully created", {
      status: 201,
    });
  } catch (e) {
    return NextResponse.json("Client not created", { status: 500 });
  }
}
