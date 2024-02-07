import React from "react";
import { ClientType } from "@/types/client.types";
import InfoRow from "@/ui/ClientDetail/InfoRow";

type ClientDetailProps = ClientType;
type SectionType = {
  label: string;
  value: string | number;
};

const ClientDetail = ({
  clientName,
  clientAddress,
  clientEmail,
  id,
}: ClientDetailProps) => {
  const mainInfo: SectionType[] = [
    { label: "Client ID:", value: id },
    { label: "Client Name:", value: clientName },
    { label: "Client Email:", value: clientEmail },
  ];

  const addressInfo: SectionType[] = [
    { label: "Street:", value: clientAddress.street },
    { label: "City:", value: clientAddress.city },
    { label: "Postcode:", value: clientAddress.postcode },
    { label: "Country:", value: clientAddress.country },
  ];

  const renderSection = (title: string, data: SectionType[]) => {
    return (
      <div
        className={
          "w-full h-auto pt-2.5 pb-5 px-5 bg-eclipse rounded-[10px] mb-2.5 md:bg-midnight md:mb-0 md:w-full"
        }
      >
        <div className={"w-full border-b border-b-midnight pb-[5px] md:pb-6"}>
          <p className={"text-base text-cloudGray md:text-2xl"}>{title}</p>
        </div>
        <div className={"grid grid-rows-2 grid-cols-2 gap-x-2.5 md:gap-y-4"}>
          {data.map((item, index) => (
            <InfoRow key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className={"md:w-full md:grid md:grid-cols-2 md:gap-x-6"}>
      {renderSection("Main Information", mainInfo)}
      {renderSection("Address", addressInfo)}
    </div>
  );
};

export default ClientDetail;
