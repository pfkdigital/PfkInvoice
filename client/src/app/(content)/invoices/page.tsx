import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "@/lib/tableHeaders";
import { getAllInvoices } from "@/lib/api-functions";
import { unstable_noStore as noStore } from "next/cache";

const InvoicePage = async () => {
  noStore();
  const invoices = await getAllInvoices();
  return (
    invoices && (
      <div
        className={
          "relative px-2.5 w-full max-w-[1200px] bg-midnight mb-20 rounded-[10px] md:bg-eclipse md:py-9 md:px-[50px]"
        }
      >
        <InvoiceTable
          headers={invoicesHeaders}
          invoices={invoices}
          showFilterRow={true}
          lightRows={false}
        />
      </div>
    )
  );
};

export default InvoicePage;
