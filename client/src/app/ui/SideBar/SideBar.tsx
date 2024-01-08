"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function SideBar() {
  const [isVisible, setIsVisible] = useState(true);
  const path = usePathname();
  console.log(path);
  return (
    <motion.aside
      animate={{ width: isVisible ? 280 : 75 }}
      className={
        "hidden md:block sticky py-4 w-[280px] min-h-screen h-full bg-eclipse mt-[16px] rounded-tr-[10px] rounded-br-[10px] overflow-clip"
      }
    >
      <div
        className={
          "flex items-center h-[50px] w-full bg-oceanBlue pl-[30px] cursor-pointer"
        }
      >
        <Image
          src={"/home.svg"}
          alt={"home-page-icon"}
          width={20}
          height={20}
          className={"mr-[10px]"}
        />
        {isVisible && (
          <p className={"text-xl text-snowWhite leading-6"}>Dashboard</p>
        )}
      </div>
      <div
        className={
          "flex items-center h-[50px] w-full pl-[30px] rounded-tr-[10px] rounded-br-[10px] cursor-pointer"
        }
      >
        <Image
          src={"/invoice.svg"}
          alt={"invoice-icon"}
          width={20}
          height={20}
          className={"mr-[10px]"}
        />
        {isVisible && (
          <p className={"text-xl text-snowWhite leading-6"}>Invoices</p>
        )}
      </div>
      <div
        className={
          "flex items-center h-[50px] w-full pl-[30px] rounded-tr-[10px] rounded-br-[10px] cursor-pointer"
        }
      >
        <Image
          src={"/client.svg"}
          alt={"clients-icon"}
          width={20}
          height={20}
          className={"mr-[10px]"}
        />
        {isVisible && (
          <p className={"text-xl text-snowWhite leading-6"}>Clients</p>
        )}
      </div>
      {isVisible ? (
        <Image
          src={"/menu-open.svg"}
          alt={"close-icon"}
          height={25}
          width={25}
          onClick={() => setIsVisible(!isVisible)}
          className={"absolute bottom-5 right-5"}
        />
      ) : (
        <Image
          src={"/menu-close.svg"}
          alt={"open-icon"}
          height={25}
          width={25}
          onClick={() => setIsVisible(!isVisible)}
          className={"absolute bottom-5 right-5"}
        />
      )}
    </motion.aside>
  );
}

export default SideBar;
