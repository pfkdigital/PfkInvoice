import React from "react";
import ClientFormContainer from "@/ui/ClientFormContainer/ClientFormContainer";

const Page = () => {
  return (
    <div className={"flex-col max-w-[1000px] w-full px-2.5"}>
      <div
        className={"w-full h-fit rounded-[20px] md:p-5 md:bg-eclipse md:pb-9"}
      >
        <ClientFormContainer type={"create"} />
      </div>
    </div>
  );
};

export default Page;
