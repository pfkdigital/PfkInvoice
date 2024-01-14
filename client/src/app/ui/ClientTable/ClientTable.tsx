'use client'

import Image from 'next/image';
import React from 'react';
import Button from '../Button/Button';
import PlusIcon from '@/../public/plus.svg';
import {ClientType} from "@/types/client.types";
import Link from "next/link";

interface ClientTableProps {
    headers: string[];
    clients: ClientType[];
}

const ClientTable = ({headers, clients}: ClientTableProps) => {

    const renderHeaders = () => {
        return headers.map((header, index) => (
            <th
                className="w-full flex justify-start table-heading-cols last:justify-end text-sm font-normal leading-4 text-snowWhite"
                key={index}
            >
                {header}
            </th>
        ));
    };

    const renderClientData = (data: ClientType[]) => {
        return data.map((item, index) => (
            <Link href={`/clients/${item.id}`} key={index}>
                <tr
                    className={
                        "w-full grid grid-cols-3 h-auto bg-eclipse rounded-[7px] px-[16px] py-[9px] mb-[10px] md:grid-cols-6 md:bg-midnight"
                    }
                >
                    <td
                        className={
                            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis"
                        }
                    >
                        {item.clientName}
                    </td>
                    <td
                        className={
                            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis"
                        }
                    >
                        {item.clientEmail}
                    </td>
                    <td
                        className={
                            "text-snowWhite text-[12px] leading-[14.4px] text-right overflow-hidden whitespace-nowrap text-ellipsis md:text-center"
                        }
                    >
                        {item.clientAddress.country}
                    </td>
                    <td
                        className={
                            "w-full text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis hidden md:block"
                        }
                    >
                        {item.clientAddress.city}
                    </td>
                    <td
                        className={
                            "text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis hidden md:block md:text-left"
                        }
                    >
                        {item.clientAddress.street}
                    </td>
                    <td
                        className={
                            "w-full text-snowWhite text-[12px] leading-[14.4px] hidden text-right md:flex justify-end"
                        }
                    >
                        {item.clientAddress.postcode}
                    </td>
                </tr>
            </Link>
        ));
    };

    return (
        <div className="max-h-auto mt-[16px] p-5 rounded-[20px] md:mx-[10px] md:bg-eclipse">
            <div className="w-full flex justify-between items-center mb-7">
                <div className="w-auto md:w-[100px]">
                    <Button>
                        <Image src={PlusIcon} alt="add-icon" height={15} width={15} className="mr-[5px]"/>
                        Client
                    </Button>
                </div>
            </div>
            <table className="w-full max-w-[1388px] h-auto">
                <thead className="hidden mb-[10px] md:flex">
                <tr className="w-full py-[10px] border-t-[1px] border-b-[1px] border-t-midnight border-b-midnight px-[16px] md:grid md:grid-cols-6 [&>*:nth-child(3)]:justify-center [&>*:nth-child(5)]:justify-start">
                    {headers && renderHeaders()}
                </tr>
                </thead>
                <tbody>{clients && renderClientData(clients)}</tbody>
            </table>
        </div>
    );
};

export default ClientTable;
