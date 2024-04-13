import React from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SidebarProvider } from "@/lib/side-bar-context-provider";
import { Toaster } from "@/components/sonner";

const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PFK Invoice | Dashboard page",
  description: "Displays invoices and clients",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <SidebarProvider>
        <html lang="en">
          <body className={`${lato.className} overflow-x-clip`}>
            {children}
            <Toaster />
          </body>
        </html>
      </SidebarProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
