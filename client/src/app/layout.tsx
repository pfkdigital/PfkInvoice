import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import SideBar from "@/app/ui/SideBar/SideBar";
import NavBar from "@/app/ui/NavBar/NavBar";
import BottomBar from "@/app/ui/BottomBar/BottomBar";
import "./globals.css";

const lato = Lato({ weight: "400", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className} relative`}>
        <NavBar />
        <div className={"w-screen md:flex md:justify-start"}>
          <SideBar />
          {children}
        </div>
        <BottomBar />
      </body>
    </html>
  );
}
