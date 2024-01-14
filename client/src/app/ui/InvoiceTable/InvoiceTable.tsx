'use client'

import Image from 'next/image';
import {useEffect, useState} from 'react';
import Button from '../Button/Button';
import PlusIcon from '@/../public/plus.svg';
import {InvoiceType} from '@/types/invoice.types';
import FilterBox from '../FilterBox/FilterBox';
import Link from "next/link";

interface InvoiceTableProps {
    headers: string[];
    invoices: InvoiceType[];
}

const InvoiceTable = ({headers, invoices}: InvoiceTableProps) => {
    const [showFilters, setShowFilters] = useState(false);
    const [currentStatusFilter, setCurrentStatusFilter] = useState<'Paid' | 'Unpaid' | ''>('');

    const [filteredInvoices, setFilteredInvoices] = useState<InvoiceType[]>([]);

    useEffect(() => {
        if (invoices) {
            const filteredResults = invoices.filter((invoice) => invoice.invoiceStatus === currentStatusFilter);
            setFilteredInvoices(filteredResults);
        }
    }, [currentStatusFilter, invoices]);

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

    const renderInvoiceData = (data: InvoiceType[]) => {
        return data.map((invoice, index) => (
            <Link key={index} href={`/invoices/${invoice.id}`}>
                <tr
                    className="w-full h-auto grid grid-cols-4 bg-eclipse rounded-[7px] px-[16px] py-[9px] mb-[10px] md:grid-cols-8 md:bg-midnight md:py-[12px]"
                >
                    <td className="text-snowWhite text-[12px] leading-[14.4px]">{invoice.invoiceReference}</td>
                    <td className="text-snowWhite text-[12px] leading-[14.4px]">{invoice.createdAt}</td>
                    <td className="text-snowWhite text-[12px] leading-[14.4px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {invoice.clientName}
                    </td>
                    <td className="text-snowWhite text-[12px] leading-[14.4px] hidden md:block overflow-hidden whitespace-nowrap text-ellipsis">
                        {invoice.description}
                    </td>
                    <td className="text-snowWhite text-[12px] leading-[14.4px] hidden md:flex justify-center">
                        {invoice.paymentTerms}
                    </td>
                    <td className="text-snowWhite text-[12px] leading-[14.4px] hidden md:flex justify-center">
                        {invoice.paymentDue}
                    </td>
                    <td className="text-snowWhite text-[12px] leading-[14.4px] hidden md:flex justify-center">${invoice.total}</td>
                    <td
                        className={`w-full ${
                            invoice.invoiceStatus === 'Paid' ? 'text-oceanBlue' : 'text-snowWhite'
                        } text-[12px] leading-[14.4px] text-right`}
                    >
                        {invoice.invoiceStatus}
                    </td>
                </tr>
            </Link>
        ));
    };

    const dataToDisplay = filteredInvoices.length > 0 ? filteredInvoices : invoices;
    return (
        <div className="max-h-auto mt-[16px] p-5 rounded-[20px] md:mx-[10px] md:bg-eclipse">
            <div className="w-full flex justify-between items-center mb-7">
                <div className="w-auto md:w-[100px]">
                    <Button>
                        <Image src={PlusIcon} alt="add-icon" height={15} width={15} className="mr-[5px]"/>
                        Invoice
                    </Button>
                </div>
                <FilterBox
                    isVisible={showFilters}
                    toggleVisibility={setShowFilters}
                    statusFilter={currentStatusFilter}
                    setStatusFilter={setCurrentStatusFilter}
                />
            </div>
            <table className="w-full max-w-[1388px] h-auto">
                <thead className="hidden mb-[10px] md:flex">
                <tr className="w-full py-[10px] border-t-[1px] border-b-[1px] border-t-midnight border-b-midnight px-[16px] md:grid md:grid-cols-8">
                    {headers && renderHeaders()}
                </tr>
                </thead>
                <tbody>{invoices && renderInvoiceData(dataToDisplay)}</tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
