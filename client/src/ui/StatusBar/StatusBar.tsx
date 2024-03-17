import React from "react";
import {
  getClientCount,
  getInvoiceCount,
  getInvoiceRevenue,
  getUnpaidRevenue,
} from "@/lib/api-functions";
import StatusCard from "@/ui/StatusBar/StatusCard";

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
        "w-full h-auto overflow-x-scroll overflow-y-clip no-scrollbar max-w-[1400px] md:overflow-x-clip"
      }
    >
      <div className={"flex md:grid md:grid-cols-4"}>
        <StatusCard
          label={invoiceCount.label}
          status={invoiceCount.status}
          currency={false}
          iconUrl={"/invoice.svg"}
        />
        <StatusCard
          label={invoiceRevenue.label}
          status={invoiceRevenue.status}
          currency={true}
          iconUrl={"/revenue.svg"}
        />
        <StatusCard
          label={clientCount.label}
          status={clientCount.status}
          currency={false}
          iconUrl={"/client.svg"}
        />
        <StatusCard
          label={unpaidRevenue.label}
          status={unpaidRevenue.status}
          currency={true}
          iconUrl={"/clock.svg"}
        />
      </div>
    </div>
  );
};

export default StatusBar;
