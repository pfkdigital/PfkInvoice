import StatusBar from "@/ui/StatusBar/StatusBar";
import LatestContainer from "@/ui/LatestContainer/LatestContainer";
import { getLatestClients, getLatestInvoices } from "@/lib/api-functions";
import { unstable_noStore as noStore } from "next/cache";

export default async function Dashboard() {
  noStore();
  const [invoices, clients] = await Promise.all([
    getLatestInvoices(),
    getLatestClients(),
  ]);
  return (
    <main className="flex-col w-full h-auto overflow-x-clip">
      <StatusBar />
      {invoices && clients && (
        <LatestContainer invoices={invoices} clients={clients} />
      )}
    </main>
  );
}
