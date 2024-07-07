"use client";

import React from "react";
import { Button } from "@/components/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import SignOutIcon from "@/ui/SignOutIcon/SignOutIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavBar() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <nav
      className={
        "relative w-full h-[90px] bg-eclipse flex items-center px-2.5 md:h-[70px] overflow-clip"
      }
    >
      <div className={"h-auto w-full flex justify-between"}>
        <Button>PFK Invoice</Button>
        <div className={"w-auto h-full flex items-center"}>
          <div className={"hidden md:flex mr-14"}>
            <Button size={"sm"} onClick={() => router.push("/invoices/new")}>
              New Invoice
            </Button>
          </div>
          <div className={"hidden md:flex"}>
            {user && (
              <Link href={"/user-profile"}>
                <div className={"h-full flex items-center mr-[30px]"}>
                  <div className={"flex relative w-[30px] h-[30px] mr-[5px] "}>
                    <Image
                      src={user?.imageUrl}
                      alt={"profile-pic"}
                      className={"rounded-full"}
                      fill
                    />
                  </div>
                  <div className={"flex-col"}>
                    <p className={"text-[14px] leading-5 text-snowWhite mb-px"}>
                      {user?.username}
                    </p>
                    <p className={"text-snowWhite text-[10px] italic"}>
                      Online
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div
            className={
              "bg-oceanBlue rounded-[10px] cursor-pointer mr-2.5 hover:bg-navyBlue transition-all duration-200 ease-in-out"
            }
          >
            <SignOutIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
