import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "../../../../../public/arrow-left.svg";
import Button from "@/ui/Button/Button";
import BinIcon from "../../../../../public/bin.svg";
import ClientForm from "@/ui/ClientForm/ClientForm";
import { getClientById, updateClientById } from "@/app/lib/api-functions";

const Page = async ({ params }: { params: { id: number } }) => {
  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className={"flex-col max-w-[873px] w-full px-2.5"}>
      <div
        className={
          "w-full h-fit mt-[16px] rounded-[20px] md:p-5 md:mx-[10px] md:bg-eclipse"
        }
      >
        <div className={"p-4 flex justify-start items-center"}>
          <Link href={"/clients"} className={"md:hidden"}>
            <Image
              src={ArrowLeft}
              alt={"back-arrow-icon"}
              width={25}
              height={20}
            />
          </Link>
          <p className={"text-cloudGray text-s ml-[31px] text-lg md:hidden"}>
            Client / {`${clientId}`}
          </p>
          <p className={"text-cloudGray text-s text-lg w-auto"}>
            Client: {`${clientId}`}
          </p>
          <div
            className={"ml-auto flex items-center gap-x-8 md:flex-row-reverse"}
          >
            <Button type={"submit"}>Save</Button>
            <Link href={`/clients/${clientId}`}>
              <Button theme={"secondary"}>
                <Image src={BinIcon} alt={"bin-icon"} width={15} height={15} />
              </Button>
            </Link>
          </div>
        </div>
        {client && (
          <ClientForm
            client={client}
            id={clientId}
            editClient={updateClientById}
            type={"edit"}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
