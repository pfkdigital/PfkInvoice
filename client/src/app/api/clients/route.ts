import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/api-functions";
import { ClientDTOType } from "@/types/client.types";

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as ClientDTOType;
  try {
    await createClient(payload);

    return NextResponse.json("Client was successfully created", {
      status: 201,
    });
  } catch (e) {
    return NextResponse.json("Client not created", { status: 500 });
  }
}
