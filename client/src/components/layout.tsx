import React from "react";
import NavBar from "@/ui/NavBar/NavBar";
import SideBar from "@/ui/SideBar/SideBar";
import BottomBar from "@/ui/BottomBar/BottomBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PFK Invoice | All invoices page",
  description: "Displays all invoices",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main
        className={"min-w-screen w-full h-full md:flex md:justify-start py-5"}
      >
        <SideBar />
        <section className={"w-full md:mx-2.5"}>{children}</section>
        <BottomBar />
      </main>
    </>
  );
};

export default Layout;
