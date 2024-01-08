import React from "react";
import {
  getClientCount,
  getInvoiceCount,
  getInvoiceRevenue,
  getUnpaidRevenue,
} from "@/app/lib/api-functions";
import StatusCard from "@/app/ui/StatusBar/StatusCard";

const StatusBar = async () => {
  const [invoiceCount, invoiceRevenue, clientCount, unpaidRevenue] =
    await Promise.all([
      getInvoiceCount(),
      getInvoiceRevenue(),
      getClientCount(),
      getUnpaidRevenue(),
    ]);

  return (
    <div
      className={
        "w-full h-auto overflow-x-scroll overflow-y-clip no-scrollbar pl-[5px] md:pl-0 md:px-[10px] max-w-[1388px] md:overflow-x-clip"
      }
    >
      <div className={"flex"}>
        <StatusCard
          label={"Invoices"}
          status={10000}
          currency={false}
          iconUrl={"/invoice.svg"}
        />
        <StatusCard
          label={"Revenue"}
          status={10000}
          currency={false}
          iconUrl={"/revenue.svg"}
        />
        <StatusCard
          label={"Clients"}
          status={10000}
          currency={false}
          iconUrl={"/client.svg"}
        />
        <StatusCard
          label={"Pending"}
          status={10000}
          currency={false}
          iconUrl={"/clock.svg"}
        />
      </div>
    </div>
  );
};

export default StatusBar;
