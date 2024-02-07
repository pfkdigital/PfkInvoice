import React from "react";
import {
  getClientCount,
  getInvoiceCount,
  getInvoiceRevenue,
  getUnpaidRevenue,
} from "@/app/lib/api-functions";
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
          label={"Invoices"}
          status={invoiceCount}
          currency={false}
          iconUrl={"/invoice.svg"}
        />
        <StatusCard
          label={"Revenue"}
          status={`$ ${invoiceRevenue}`}
          currency={false}
          iconUrl={"/revenue.svg"}
        />
        <StatusCard
          label={"Clients"}
          status={clientCount}
          currency={false}
          iconUrl={"/client.svg"}
        />
        <StatusCard
          label={"Pending"}
          status={`$ ${unpaidRevenue}`}
          currency={false}
          iconUrl={"/clock.svg"}
        />
      </div>
    </div>
  );
};

export default StatusBar;
