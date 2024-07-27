import StatusBar from "@/ui/StatusBar/StatusBar";
import GraphContainer from "@/ui/GraphContainer/GraphContainer";
import {
  getRevenueByMonth,
  countInvoicesByMonth,
  calculatePaidVsUnpaidProportion,
  getTopClientsByTotalAmount,
} from "@/lib/api-functions";
import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PFK Invoice | Dashboard page",
  description: "Display Dashboard page",
};

export default async function Dashboard() {
  noStore();

  const [revenueData, invoiceCountData, paymentStatusData, topClientsData] =
    await Promise.all([
      getRevenueByMonth(),
      countInvoicesByMonth(),
      calculatePaidVsUnpaidProportion(),
      getTopClientsByTotalAmount(),
    ]);

  return (
    <main className="flex-col w-full h-auto overflow-x-clip">
      <StatusBar />
      {revenueData &&
        invoiceCountData &&
        paymentStatusData &&
        topClientsData && (
          <GraphContainer
            revenueData={revenueData}
            invoiceCountData={invoiceCountData}
            paymentStatusData={paymentStatusData}
            topClientsData={topClientsData}
          />
        )}
    </main>
  );
}
