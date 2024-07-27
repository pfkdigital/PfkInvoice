import React from "react";
import NavBar from "@/ui/NavBar/NavBar";
import SideBar from "@/ui/SideBar/SideBar";
import BottomBar from "@/ui/BottomBar/BottomBar";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "PFK Invoice | All invoices page",
  description: "Displays all invoices",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  noStore();

  return (
    <>
      <NavBar />
      <main className={"relative md:flex md:justify-start py-5"}>
        <div className={"hidden md:block"}>
          <SideBar />
        </div>
        <section
          className={
            "w-full px-2.5 overflow-x-scroll no-scrollbar .no-scrollbar::-webkit-scrollbar"
          }
        >
          {children}
          <BottomBar />
        </section>
      </main>
    </>
  );
};

export default Layout;
