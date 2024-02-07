import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "../../../../public/arrow-left.svg";
import Button from "@/ui/Button/Button";
import BinIcon from "../../../../public/bin.svg";
import ClientForm from "@/ui/ClientForm/ClientForm";
import { createClient } from "@/app/lib/api-functions";

const Page = () => {
  return (
    <div className={"flex-col max-w-[873px] w-full px-2.5"}>
      <div
        className={
          "w-full h-fit mt-[16px] rounded-[20px] md:p-5 md:mx-[10px] md:bg-eclipse md:pb-9"
        }
      >
        <div className={"p-4 flex justify-start items-center"}>
          <Link href={"/clients"}>
            <Image
              src={ArrowLeft}
              alt={"back-arrow-icon"}
              width={25}
              height={20}
            />
          </Link>
          <p className={"text-cloudGray text-s ml-[31px] text-lg"}>
            Client / Create
          </p>
          <div className={"ml-auto flex items-center gap-x-8"}>
            <Button type={"submit"}>Create</Button>
            <Link href={`/clients`}>
              <Button theme={"secondary"}>
                <Image src={BinIcon} alt={"bin-icon"} width={15} height={15} />
              </Button>
            </Link>
          </div>
        </div>
        <ClientForm createClient={createClient} type={"create"} />
      </div>
    </div>
  );
};

export default Page;
