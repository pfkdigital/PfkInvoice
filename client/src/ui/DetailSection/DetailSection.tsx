import React from "react";
import InfoRow from "@/ui/ClientDetail/InfoRow";
import { DetailSectionType } from "@/types/client.types";

const DetailSection = ({ title, data }: DetailSectionType) => {
  return (
    <div
      className={
        "w-full h-auto pt-2.5 pb-5 px-5 bg-eclipse rounded-[10px] mb-2.5 md:bg-midnight md:w-full"
      }
    >
      <div
        className={"w-full border-b border-b-midnight mb-2.5 pb-[5px] md:pb-4"}
      >
        <p className={"text-base text-cloudGray md:text-xl"}>{title}</p>
      </div>
      <div className={"grid grid-rows-2 grid-cols-2 gap-x-2.5 md:gap-y-4"}>
        {data.map((item, index) => (
          <InfoRow key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default DetailSection;
