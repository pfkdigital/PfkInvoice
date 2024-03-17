"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/lib/side-bar-context-provider";

function SideBar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const path = usePathname();
  const isClientPage = path.includes("clients");
  const isInvoicePage = path.includes("invoices");

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 280 : 75 }}
      className={
        "hidden relative md:block py-4 min-w-[75px] max-w-[280px] h-[784px] bg-eclipse rounded-tr-[10px] rounded-br-[10px] overflow-clip"
      }
    >
      <Link href={"/dashboard"}>
        <div
          className={`flex items-center h-[50px] w-full cursor-pointer ${
            path === "/dashboard" ? "bg-oceanBlue" : ""
          } pl-[30px]`}
        >
          <Image
            src={"/home.svg"}
            alt={"home-page-icon"}
            width={20}
            height={20}
            className={"mr-[10px]"}
          />
          {isSidebarOpen && (
            <p className={"text-xl text-snowWhite leading-6"}>Dashboard</p>
          )}
        </div>
      </Link>
      <Link href={"/invoices"}>
        <div
          className={`flex items-center h-[50px] w-full ${
            isInvoicePage ? "bg-oceanBlue" : ""
          } pl-[30px] cursor-pointer`}
        >
          <Image
            src={"/invoice.svg"}
            alt={"invoice-icon"}
            width={20}
            height={20}
            className={"mr-[10px]"}
          />
          {isSidebarOpen && (
            <p className={"text-xl text-snowWhite leading-6"}>Invoices</p>
          )}
        </div>
      </Link>
      <Link href={"/clients"}>
        <div
          className={`flex items-center h-[50px] w-full ${
            isClientPage ? "bg-oceanBlue" : ""
          } pl-[30px] cursor-pointer`}
        >
          <Image
            src={"/client.svg"}
            alt={"clients-icon"}
            width={20}
            height={20}
            className={"mr-[10px]"}
          />
          {isSidebarOpen && (
            <p className={"text-xl text-snowWhite leading-6"}>Clients</p>
          )}
        </div>
      </Link>
      {isSidebarOpen ? (
        <Image
          src={"/menu-open.svg"}
          alt={"close-icon"}
          height={25}
          width={25}
          onClick={toggleSidebar}
          className={"absolute bottom-5 right-5"}
        />
      ) : (
        <Image
          src={"/menu-close.svg"}
          alt={"open-icon"}
          height={25}
          width={25}
          onClick={toggleSidebar}
          className={"absolute bottom-5 right-5"}
        />
      )}
    </motion.aside>
  );
}

export default SideBar;
