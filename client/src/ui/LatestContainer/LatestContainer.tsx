"use client";

import React from "react";
import { InvoiceType } from "@/types/invoice.types";
import { invoicesHeaders } from "@/lib/tableHeaders";
import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import Link from "next/link";
import InvoiceRevenueChart, { Chart } from "@/ui/Chart/Chart";

interface LatestContainerProps {
  invoices: InvoiceType[];
  graphData: any;
}

const LatestContainer = ({ invoices, graphData }: LatestContainerProps) => {
  return (
    <div
      className={
        "w-full h-auto bg-midnight rounded-[10px] mb-20 mt-2.5 max-w-[1400px] md:mb-0"
      }
    >
      <div className={"flex-col md:grid md:grid-cols-latest-container-column"}>
        <div
          className={"bg-eclipse mb-2.5 md:mr-2.5 md:mb-0 p-5 rounded-[10px]"}
        >
          <Chart data={graphData} />
        </div>
        <div className={"bg-eclipse rounded-[10px] px-5 py-5"}>
          <div className={"w-full flex justify-between text-snowWhite "}>
            <p className={"font-bold"}>Latest Invoices</p>
            <Link className="italic" href={"/invoices"}>
              View All
            </Link>
          </div>
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={invoices}
            lightRows={true}
            showFilterRow={false}
          />
        </div>
      </div>
    </div>
  );
};

export default LatestContainer;
