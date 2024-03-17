"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowLeft from "../../../public/arrow-left.svg";
import Link from "next/link";

interface GoBackIconProps {
  href: string;
}

const GoBackIcon = ({ href }: GoBackIconProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <Image
        src={ArrowLeft}
        alt={"back-arrow-icon"}
        width={25}
        height={20}
        className={"mr-5"}
      />
    </Link>
  );
};

export default GoBackIcon;
