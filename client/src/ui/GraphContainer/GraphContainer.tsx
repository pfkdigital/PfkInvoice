import React, { memo } from "react";
import { Chart as RevenueChart } from "@/ui/BarChart/Chart";
import { Chart as InvoiceStatusChart } from "@/ui/PieChart/Chart";
import { Chart as InvoiceCountChart } from "@/ui/LineChart/Chart";
import { GraphDataType } from "@/types/invoice.types";

interface LatestContainerProps {
  revenueData: GraphDataType[];
  invoiceCountData: GraphDataType[];
  paymentStatusData: GraphDataType[];
  topClientsData: GraphDataType[];
}

const GraphContainer = ({
  revenueData,
  invoiceCountData,
  paymentStatusData,
  topClientsData,
}: LatestContainerProps) => {
  return (
    <div
      className={
        "w-full h-auto bg-midnight rounded-[10px] mb-20 mt-2.5 max-w-[1400px] md:mb-0"
      }
    >
      <div
        className={
          "grid grid-cols-1 md:grid-cols-latest-container-column gap-x-2.5 gap-y-2.5"
        }
      >
        <RevenueChart
          chartData={revenueData}
          title={"Invoice Revenue"}
          description={"The total revenue generated each month"}
        />
        <InvoiceCountChart chartData={invoiceCountData} />
        <InvoiceStatusChart chartData={paymentStatusData} />
        <RevenueChart
          chartData={topClientsData}
          title={"Top Clients By Revenue"}
          description={"The top clients by total revenue generated"}
        />
      </div>
    </div>
  );
};

export default memo(GraphContainer);
