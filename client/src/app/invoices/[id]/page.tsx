import React from "react";
import { getInvoiceById } from "@/app/lib/api-functions";
import Image from "next/image";
import ArrowLeft from "@/../public/arrow-left.svg";
import Button from "@/ui/Button/Button";
import Link from "next/link";
import InvoiceDetail from "@/ui/InvoiceDetail/InvoiceDetail";
import EditIcon from "@/../public/edit.svg";

const Page = async ({ params }: { params: { id: number } }) => {
  const invoiceId = params.id;
  const invoice = await getInvoiceById(invoiceId);

  return (
    <div
      className={
        "max-w-[1200px] w-full h-fit mt-[16px] rounded-[20px] md:mx-[10px] md:bg-eclipse"
      }
    >
      <div className={"flex justify-start items-center px-4 md:mx-5 md:mt-6"}>
        <Link href={"/invoices"}>
          <Image
            src={ArrowLeft}
            alt={"back-arrow-icon"}
            width={25}
            height={20}
          />
        </Link>
        <p className={"text-cloudGray text-s ml-[31px]"}>
          Invoice / {`${invoiceId}`}
        </p>
        <div className={"ml-auto md:hidden"}>
          <Link href={`/invoices/edit/${invoiceId}`}>
            <Button>Edit</Button>
          </Link>
        </div>
        <div className={"ml-auto hidden md:block md:w-[91px]"}>
          <Link href={`/invoices/edit/${invoiceId}`}>
            <Button>
              <Image
                src={EditIcon}
                alt={"edit-icon"}
                width={15}
                height={15}
                className={"md:mr-2.5"}
              />
              Edit
            </Button>
          </Link>
        </div>
      </div>
      <div className={"mx-2.5 mt-4"}>
        {invoice && <InvoiceDetail {...invoice} />}
      </div>
    </div>
  );
};

export default Page;
