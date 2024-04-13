"use client";

import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

type StatusCardProps = {
  label: string;
  status: string;
  currency: boolean;
  iconUrl: string;
};

const inter = Inter({ subsets: ["latin"] });

const StatusCard = ({ label, status, currency, iconUrl }: StatusCardProps) => {
  return (
    <div
      className={
        "min-w-[200px] w-1/4 min-h-[88px] rounded-[10px] bg-eclipse px-[19px] py-[15px] mr-[5px] last:mr-0  md:h-[130px] md:w-full md:mr-0"
      }
    >
      <div
        className={`h-full flex-col justify-center md:border-r-midnight md:pr-2.5`}
      >
        <div
          className={
            "flex justify-between items-center w-full md:h-1/2 md:flex-row-reverse md:justify-between"
          }
        >
          <div
            className={
              "hidden relative md:flex min-w-5 min-h-5 md:mr-[5px] p-2 bg-oceanBlue rounded-[10px]"
            }
          >
            <Image src={iconUrl} alt={`${label}-icon`} height={20} width={20} />
          </div>
          <p className={"text-xs leading-[19.2px] text-snowWhite md:text-xl"}>
            {label}
          </p>
          <div
            className={
              "p-2 flex items-center justify-center rounded-[10px] border-2 border-oceanBlue md:hidden"
            }
          >
            <Image src={iconUrl} alt={`${label}-icon`} height={15} width={15} />
          </div>
        </div>
        <div
          className={
            "w-full h-full flex justify-center mt-4 md:justify-center md:mt-0 md:h-1/2 md:items-end"
          }
        >
          <p
            className={`${inter.className} text-base font-bold text-snowWhite md:text-[24px]`}
          >
            {currency ? `$ ${status}` : status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
