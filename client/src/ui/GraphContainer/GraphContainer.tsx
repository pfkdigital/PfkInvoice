import React, { memo } from "react";
import { Chart as RevenueChart } from "@/ui/BarChart/Chart";
import { Chart as InvoiceStatusChart } from "@/ui/PieChart/Chart";
import { Chart as InvoiceCountChart } from "@/ui/LineChart/Chart";

interface LatestContainerProps {
  revenueData: any;
  invoiceCountData: any;
  paymentStatusData: any;
}

const GraphContainer = ({
  revenueData,
  invoiceCountData,
  paymentStatusData,
}: LatestContainerProps) => {
  return (
    <div
      className={
        "w-full h-auto bg-midnight rounded-[10px] mb-20 mt-2.5 max-w-[1400px] md:mb-0"
      }
    >
      <div
        className={
          "flex-col md:grid md:grid-cols-latest-container-column gap-x-2.5 gap-y-2.5"
        }
      >
        <RevenueChart
          chartData={revenueData}
          title={"Invoice Revenue"}
          description={"The total revenue generated each month"}
        />
        <InvoiceStatusChart chartData={paymentStatusData} />
        <RevenueChart
          chartData={revenueData}
          title={"Invoice Revenue"}
          description={"The total revenue generated each month"}
        />
        <InvoiceCountChart chartData={invoiceCountData} />
      </div>
    </div>
  );
};

export default memo(GraphContainer);
