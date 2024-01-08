"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

type StatusCardProps = {
  label: string;
  status: number;
  currency: boolean;
  iconUrl: string;
};

const inter = Inter({ subsets: ["latin"] });

const StatusCard = ({ label, status, currency, iconUrl }: StatusCardProps) => {
  const [isLastItem, setIsLastItem] = useState(false);

  useEffect(() => {
    if (label === "Pending") {
      setIsLastItem(true);
      return;
    }
    setIsLastItem(false);
  }, []);
  return (
    <div
      className={
        "min-w-[145px] h-[88px] rounded-[10px] bg-eclipse px-[19px] py-[15px] mr-[5px] last:mr-0 md:w-1/4 md:mr-0 md:rounded-none md:first:rounded-l-[10px] md:last:rounded-r-[10px] md:h-[130px]"
      }
    >
      <div
        className={`h-full flex-col justify-center md:border-r-midnight ${
          !isLastItem ? "md:border-r-[1px]" : null
        }`}
      >
        <div
          className={
            "flex justify-between items-center w-full md:h-1/2 md:justify-start"
          }
        >
          <div className={"hidden relative md:flex w-5 h-5 md:mr-[5px]"}>
            <Image src={iconUrl} alt={`${label}-icon`} fill />
          </div>
          <p
            className={
              "text-xs leading-[19.2px] text-snowWhite md:text-xl lg:text-2xl"
            }
          >
            {label}
          </p>
          <div
            className={
              "px-[7px] py-px flex items-center justify-center rounded-full border-2 border-oceanBlue md:hidden"
            }
          >
            <span className={"text-xs text-oceanBlue"}>+100</span>
          </div>
        </div>
        <div
          className={
            "w-full h-full flex justify-center mt-4 md:justify-center md:mt-0 md:h-1/2 md:items-end "
          }
        >
          <p
            className={`${inter.className} text-base font-bold text-snowWhite md:text-[24px]`}
          >
            10,000
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
