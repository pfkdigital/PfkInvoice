import React from 'react';
import {getInvoiceById} from "@/app/lib/api-functions";
import Image from "next/image";
import ArrowLeft from "@/../public/arrow-left.svg"
import Button from "@/app/ui/Button/Button";
import Link from "next/link";
import InvoiceDetail from "@/app/ui/InvoiceDetail/InvoiceDetail";
import EditIcon from "@/../public/edit.svg"

const Page = async ({params}:{params: {id:string}}) => {
    const invoiceId = +params.id
    const invoice = await getInvoiceById(invoiceId)

    return (
        <div className={"max-h-auto mt-[16px] p-5 rounded-[20px] md:mx-[10px] md:bg-eclipse"}>
            <div className={"p-4 flex justify-start items-center"}>
                <Link href={"/invoices"}>
                    <Image src={ArrowLeft} alt={"back-arrow-icon"} width={25} height={20}/>
                </Link>
                <p className={"text-cloudGray text-s ml-[31px]"}>Invoice / {`${invoiceId}`}</p>
                <div className={"ml-auto md:hidden"}>
                    <Button>Edit</Button>
                </div>
                <div className={"ml-auto hidden md:block md:w-[91px]"}>
                    <Button>
                        <Image src={EditIcon} alt={"edit-icon"} width={15} height={15} />
                        Edit
                    </Button>
                </div>
            </div>
            <div className={"p-1"}>
                {invoice && <InvoiceDetail {...invoice} />}
            </div>
        </div>
    );
};

export default Page;