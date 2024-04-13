"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowLeft from "@/../public/arrow-left.svg";
import { Button } from "@/components/button";
import BinIcon from "@/../public/bin.svg";
import { useRouter } from "next/navigation";
import { deleteInvoiceById } from "@/lib/api-functions";
import CloseIcon from "../../../public/close.svg";
import { toast } from "sonner";

type TitleBarProps = {
  type: "create" | "edit";
  invoiceId?: number;
};

const InvoiceTitleBar = ({ invoiceId, type }: TitleBarProps) => {
  const router = useRouter();
  const pageTitle = "";

  const handleDelete = async () => {
    if (!invoiceId) return;
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });
      toast.success(response.json());
      router.push("/invoices");
    } catch (e) {
      toast.error("Invoice not deleted");
    }
  };

  const handleNavigation = () => {
    if (type === "edit") {
      return `/invoices/${invoiceId}`;
    } else {
      return `/invoices`;
    }
  };

  const renderButtons = () => {
    return type === "edit" ? (
      <>
        <Button size={"sm"} type={"submit"} form={"invoice-form"}>
          Save Changes
        </Button>
        <Button
          className={"ml-2.5"}
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
      </>
    ) : (
      <>
        <Button form={"invoice-form"} className={"md:mr-5"} type={"submit"}>
          Create
        </Button>
        <Link href={"/invoices"} className={"hidden md:inline-block"}>
          <Button
            variant={"ghost"}
            type={"submit"}
            form={"invoice-form"}
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
      </>
    );
  };

  return (
    <div className={"flex justify-start items-center px-2.5 md:mx-5 md:pt-10"}>
      <Link href={handleNavigation()}>
        <Image src={ArrowLeft} alt={"back-arrow-icon"} width={25} height={20} />
      </Link>
      <p className={"text-cloudGray text-s ml-[31px]"}>{pageTitle}</p>
      <div className={"ml-auto flex items-center md:justify-end"}>
        {renderButtons()}
      </div>
    </div>
  );
};

export default InvoiceTitleBar;
