import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "../../../../public/arrow-left.svg";
import CloseIcon from "@/../public/close.svg";
import InvoiceForm from "@/ui/InvoiceForm/InvoiceForm";
import { getAllClients } from "@/app/lib/api-functions";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const clients = await getAllClients();
  return (
    <div
      className={
        "max-w-[873px] w-full h-fit mt-[16px] rounded-[20px] md:mx-[10px] md:bg-eclipse md:pb-7"
      }
    >
      <div
        className={
          "flex justify-start items-center px-4 md:mx-5 md:mt-6 md:pr-0"
        }
      >
        <Link href={"/invoices"} className={"md:hidden"}>
          <Image
            src={ArrowLeft}
            alt={"back-arrow-icon"}
            width={25}
            height={20}
          />
        </Link>
        <p className={"text-cloudGray text-s ml-[31px] md:ml-0"}>
          Invoice / Create
        </p>
        <div className={"ml-auto flex items-center md:justify-end"}>
          <Button
            type={"submit"}
            form={"new-invoice-form"}
            className={"md:mr-5"}
          >
            Create
          </Button>
          <Link href={"/invoices"} className={"hidden md:inline-block"}>
            <Button
              variant={"ghost"}
              type={"submit"}
              form={"new-invoice-form"}
              className={"px-0"}
            >
              <Image
                src={CloseIcon}
                alt={"close-icon"}
                width={20}
                height={20}
                className={"hidden md:inline-block"}
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className={"mx-2.5 mt-4 md:px-4"}>
        {clients && <InvoiceForm clients={clients} type={"create"} />}
      </div>
    </div>
  );
};

export default Page;
