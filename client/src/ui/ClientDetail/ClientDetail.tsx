import React from "react";
import { ClientType } from "@/types/client.types";
import InfoRow from "@/ui/ClientDetail/InfoRow";
import DetailSection from "@/ui/DetailSection/DetailSection";

type SectionType = {
  label: string;
  value: string | number;
};

const ClientDetail = ({
  clientName,
  clientAddress,
  clientEmail,
  id,
}: ClientType) => {
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

  return (
    <div className={"md:w-full md:grid md:grid-cols-2 md:gap-x-2.5"}>
      <DetailSection title={"Main Information"} data={mainInfo} />
      <DetailSection title={"Address"} data={addressInfo} />
    </div>
  );
};

export default ClientDetail;
