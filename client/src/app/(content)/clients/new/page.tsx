import React from "react";
import ClientTitleBar from "@/ui/ClientTitleBar/ClientTitleBar";
import ClientForm from "@/ui/ClientForm/ClientForm";

const Page = () => {
  return (
    <div className={"flex-col max-w-[1000px] w-full px-2.5"}>
      <div
        className={"w-full h-fit rounded-[20px] md:p-5 md:bg-eclipse md:pb-9"}
      >
        <ClientTitleBar type={"create"} />
        <div className={"mx-2.5 mt-4 md:px-4"}>
          <ClientForm type={"create"} />
        </div>
      </div>
    </div>
  );
};

export default Page;
