import React from 'react';
import {InvoiceDetailsType} from "@/types/invoice.types";
import InvoiceItemTable from "@/app/ui/InvoiceItemTable/InvoiceItemTable";
import {invoiceItemHeaders} from "@/app/lib/tableHeaders";

type InvoiceDetailProps = InvoiceDetailsType

const InvoiceDetail = ({
                           invoiceReference,
                           description,
                           createdAt,
                           paymentDue,
                           client,
                           invoiceStatus,
                           invoiceItems,
    total
                       }: InvoiceDetailProps) => {
    const isPaid = invoiceStatus === "Paid";
    return (
        <div className={"flex-col w-full"}>
            <div className={"bg-midnight w-full flex-col md:grid md:grid-rows-invoice-grid md:grid-cols-invoice-grid md:bg-eclipse"}>
                <div
                    className={"bg-eclipse w-full rounded-[10px] px-5 py-[10px] mb-[10px] flex justify-between md:mb-0"}>
                    <div className={"flex justify-start"}>
                        <div className={"flex-col justify-center items-start mr-[5px]"}>
                            <p className={"text-cloudGray text-base font-normal mr-[14px]"}>{invoiceReference}</p>
                            <p className={"text-cloudGray text-[10px]"}>{description}</p>
                        </div>
                        <div
                            className={"flex justify-center items-center w-[54px] h-5 bg-oceanBlue rounded-[10px] text-[10px] font-bold text-cloudGray "}>
                            <span>{isPaid ? "Paid" : "Unpaid"}</span>
                        </div>
                    </div>
                    <div className={"ml-[10px] flex-col flex-wrap"}>
                        <p>
                            <span className={"text-xs text-cloudGray font-bold mr-[20px]"}>Created:</span><span
                            className={"font-normal text-cloudGray text-xs"}>{createdAt}</span>
                        </p>
                        <p>
                            <span className={"text-xs text-cloudGray font-bold mr-[20px]"}>Due date:</span><span
                            className={"font-normal text-cloudGray text-xs"}>{paymentDue}</span>
                        </p>
                    </div>
                </div>
                <div className={"bg-eclipse w-full rounded-[10px] px-5 py-[10px] mb-[10px] flex-col md:mb-0 md:bg-midnight"}>
                    <div className={"border-b border-b-midnight mb-1"}>
                        <p className={"text-xl text-cloudGray pb-2"}>Client</p>
                    </div>
                    <div className={"flex-col"}>
                        <div className={"grid grid-cols-2 grid-rows-1 md:grid-rows-2 md:grid-cols-1"}>
                            <p className={"text-[12px] text-oceanBlue font-bold"}>Name: </p>
                            <p className={"text-smokeGray text-[12px] font-normal"}>{client.clientName}</p>
                        </div>
                        <div className={"grid grid-cols-2 grid-rows-1 md:grid-rows-2 md:grid-cols-1"}>
                            <p className={"text-[12px] text-oceanBlue font-bold"}>Email: </p>
                            <p className={"text-smokeGray text-[12px] font-normal"}>{client.clientEmail}</p>
                        </div>
                        <div className={"grid grid-cols-2 grid-rows-1 md:grid-rows-2 md:grid-cols-1"}>
                            <p className={"text-[12px] text-oceanBlue font-bold"}>Country</p>
                            <p className={"text-smokeGray text-[12px] font-normal"}>{client.clientAddress.country}</p>
                        </div>
                    </div>
                </div>
                <div className={"bg-eclipse w-full rounded-[10px] px-[10px] py-[10px] mb-[10px] flex-col"}>
                    <InvoiceItemTable headers={invoiceItemHeaders} items={invoiceItems}/>
                </div>
                <div className={"w-full flex justify-end md:mt-10"}>
                    <div className={"w-40 flex justify-between items-center bg-oceanBlue rounded-[10px] py-[5px] px-4 md:w-full md:h-[30px] md:justify-around"}>
                        <p className={"text-snowWhite font-bold text-xs"}>Total: </p>
                        <p className={"text-snowWhite font-bold text-xs"}>${total}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InvoiceDetail;