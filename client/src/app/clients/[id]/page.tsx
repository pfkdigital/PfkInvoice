import { getClientById } from "@/app/lib/api-functions";
import Image from "next/image";
import ArrowLeft from "@/../public/arrow-left.svg";
import Button from "@/ui/Button/Button";
import Link from "next/link";
import EditIcon from "@/../public/edit.svg";
import InvoiceTable from "@/ui/InvoiceTable/InvoiceTable";
import { invoicesHeaders } from "@/app/lib/tableHeaders";
import ClientDetail from "@/ui/ClientDetail/ClientDetail";

const Page = async ({ params }: { params: { id: number } }) => {
  const clientId = params.id;
  const client = await getClientById(clientId);

  return (
    <div className={"flex-col max-w-[1200px] w-full px-2.5"}>
      <div
        className={
          "w-full h-fit mt-[16px] rounded-[20px] md:p-5 md:mx-[10px] md:bg-eclipse"
        }
      >
        <div className={"p-4 flex justify-start items-center"}>
          <Link href={"/clients"}>
            <Image
              src={ArrowLeft}
              alt={"back-arrow-icon"}
              width={25}
              height={20}
            />
          </Link>
          <p className={"text-cloudGray text-s ml-[31px] text-lg"}>
            Client / {`${clientId}`}
          </p>
          <Link
            href={`/clients/edit/${clientId}`}
            className={"ml-auto md:hidden"}
          >
            <Button>Edit</Button>
          </Link>
          <Link
            href={`/clients/edit/${clientId}`}
            className={"ml-auto hidden md:w-[91px] md:flex md:justify-center"}
          >
            <Button>
              <Image
                src={EditIcon}
                alt={"edit-icon"}
                width={15}
                height={15}
                className={"mr-2"}
              />
              Edit
            </Button>
          </Link>
        </div>
        <div className={"p-1"}>
          {client && client?.clientAddress && (
            <ClientDetail
              id={clientId}
              clientName={client.clientName}
              clientEmail={client.clientEmail}
              clientAddress={client.clientAddress}
            />
          )}
        </div>
      </div>
      <div
        className={
          "w-full h-fit mt-[16px] mx-[5px] p-4 md:p-0 bg-eclipse rounded-[20px] md:mx-[10px]"
        }
      >
        <p className={"text-base text-cloudGray md:hidden"}>Clint Invoices</p>
        {client && client.invoices.length > 0 && (
          <InvoiceTable
            headers={invoicesHeaders}
            invoices={client?.invoices}
            showBar={false}
            lightRows={true}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
