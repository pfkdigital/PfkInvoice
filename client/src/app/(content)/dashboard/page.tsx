import StatusBar from "@/ui/StatusBar/StatusBar";
import LatestContainer from "@/ui/LatestContainer/LatestContainer";
import { getGraphData, getLatestInvoices } from "@/lib/api-functions";
import { unstable_noStore as noStore } from "next/cache";

export default async function Dashboard() {
  noStore();

  const [invoices, graphData] = await Promise.all([
    getLatestInvoices(),
    getGraphData(),
  ]);
  return (
    <main className="flex-col w-full h-auto overflow-x-clip">
      <StatusBar />
      {invoices && graphData && (
        <LatestContainer invoices={invoices} graphData={graphData} />
      )}
    </main>
  );
}
