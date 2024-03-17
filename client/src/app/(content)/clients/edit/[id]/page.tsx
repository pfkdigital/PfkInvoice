import React from "react";
import { getClientById } from "@/lib/api-functions";
import ClientFormContainer from "@/ui/ClientFormContainer/ClientFormContainer";

const Page = async ({ params }: { params: { id: number } }) => {
  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className={"flex-col max-w-[1000px] w-full px-2.5"}>
      <div className={"w-full h-fit rounded-[20px] md:p-5 md:bg-eclipse"}>
        {client && (
          <ClientFormContainer
            client={client}
            clientId={clientId}
            type={"edit"}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
