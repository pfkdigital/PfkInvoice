import React from "react";
import { getClientById } from "@/lib/api-functions";
import ClientTitleBar from "@/ui/ClientTitleBar/ClientTitleBar";
import ClientForm from "@/ui/ClientForm/ClientForm";
import { unstable_noStore as noStore } from "next/cache";

const Page = async ({ params }: { params: { id: number } }) => {
  noStore();
  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className={"flex-col max-w-[1000px] w-full px-2.5"}>
      <div className={"w-full h-fit rounded-[20px] md:p-5 md:bg-eclipse"}>
        {client && (
          <>
            <ClientTitleBar clientId={clientId} type={"edit"} />
            <ClientForm client={client} id={clientId} type={"edit"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
