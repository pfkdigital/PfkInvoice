import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "../lib/tableHeaders";
import { getAllInvoices } from "../lib/api-functions";

const InvoicePage = async () => {
  const invoices = await getAllInvoices();
  return (
    invoices && (
      <div className={"px-2.5 w-full max-w-[1200px]"}>
        <InvoiceTable
          headers={invoicesHeaders}
          invoices={invoices}
          showBar={true}
          lightRows={false}
        />
      </div>
    )
  );
};

export default InvoicePage;
