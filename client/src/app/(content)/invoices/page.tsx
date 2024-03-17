import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "@/lib/tableHeaders";
import { getAllInvoices } from "@/lib/api-functions";

const InvoicePage = async () => {
  const invoices = await getAllInvoices();
  return (
    invoices && (
      <div
        className={
          "rounded-[10px] px-2.5 w-full max-w-[1200px] bg-midnight md:bg-eclipse md:py-9 md:px-[50px]"
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
