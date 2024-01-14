import Image from "next/image";
import StatusBar from "@/app/ui/StatusBar/StatusBar";
import LatestContainer from "@/app/ui/LatestContainer/LatestContainer";
import { getAllClients, getAllInvoices } from "@/app/lib/api-functions";

export default async function Home() {
  const [invoices, clients] = await Promise.all([
    getAllInvoices(),
    getAllClients(),
  ]);
  return (
    <main className="flex-col w-screen h-auto py-[10px] md:ml-[10px] overflow-x-clip">
      <StatusBar />
        {invoices && clients && <LatestContainer invoices={invoices} clients={clients} />}
    </main>
  );
}
