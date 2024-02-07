"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "../../../../public/arrow-left.svg";
import { Button } from "@/components/ui/button";
import BinIcon from "../../../../public/bin.svg";
import { useRouter } from "next/navigation";
import { deleteInvoice } from "@/app/lib/api-functions";

type TitleBarProps = {
  itemId: number;
};

const TitleBar = ({ itemId }: TitleBarProps) => {
  const router = useRouter();

  const handleDelete = () => {
    deleteInvoice(itemId).then((r) => router.push("/invoices"));
  };

  return (
    <div
      className={"flex justify-start items-center px-4 md:mx-5 md:mt-6 md:pr-0"}
    >
      <Link href={"/invoices"} className={"md:hidden"}>
        <Image src={ArrowLeft} alt={"back-arrow-icon"} width={25} height={20} />
      </Link>
      <p className={"text-cloudGray text-s ml-[31px] md:ml-0"}>
        Edit / Invoice / {itemId}
      </p>
      <div className={"ml-auto flex items-center md:justify-end"}>
        <Button
          size={"sm"}
          type={"submit"}
          form={"new-invoice-form"}
          className={"md:mr-5"}
        >
          Edit
        </Button>
        <Button
          variant={"destructive"}
          type={"button"}
          size={"sm"}
          onClick={handleDelete}
        >
          <span className={"text-snowWhite mr-2.5"}>Delete</span>
          <Image
            src={BinIcon}
            alt={"bin-icon"}
            width={15}
            height={15}
            className={"hidden md:inline-block"}
          />
        </Button>
      </div>
    </div>
  );
};

export default TitleBar;
