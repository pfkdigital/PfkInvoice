"use client";

import React from "react";
import Image from "next/image";
import CloseIcon from "../../../public/close.svg";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

const CancelButton = () => {
  const router = useRouter();
  return (
    <Button variant={"destructive"} size={"sm"} onClick={() => router.back()}>
      <span className={"text-snowWhite mr-2.5"}>Cancel</span>
      <Image src={CloseIcon} alt={"bin-icon"} width={15} height={15} />{" "}
    </Button>
  );
};

export default CancelButton;
