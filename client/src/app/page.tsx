import StatusBar from "@/ui/StatusBar/StatusBar";
import LatestContainer from "@/ui/LatestContainer/LatestContainer";
import { getAllClients, getAllInvoices } from "@/app/lib/api-functions";

export default async function Home() {
  const [invoices, clients] = await Promise.all([
    getAllInvoices(),
    getAllClients(),
  ]);
  return (
    <main className="flex-col w-screen h-auto py-5 px-2.5 md:ml-[10px] md:px-0 overflow-x-clip">
      <StatusBar />
      {invoices && clients && (
        <LatestContainer invoices={invoices} clients={clients} />
      )}
    </main>
  );
}
