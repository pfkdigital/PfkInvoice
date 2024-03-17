import StatusBar from "@/ui/StatusBar/StatusBar";
import LatestContainer from "@/ui/LatestContainer/LatestContainer";
import { getAllClients, getAllInvoices } from "@/lib/api-functions";

export default async function Dashboard() {
  const [invoices, clients] = await Promise.all([
    getAllInvoices(),
    getAllClients(),
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
