"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import SignOutIcon from "@/ui/SignOutIcon/SignOutIcon";
import Link from "next/link";

function NavBar() {
  const { user } = useUser();
  return (
    <nav
      className={
        "relative w-screen h-[90px] bg-eclipse flex items-center px-2.5 md:h-[70px] overflow-clip"
      }
    >
      <div className={"h-auto w-full flex justify-between"}>
        <Button>PFK Invoice</Button>
        <div className={"w-auto hidden md:flex"}>
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
                  <p className={"text-snowWhite text-[10px] italic"}>Online</p>
                </div>
              </div>
            </Link>
          )}
          <SignOutIcon />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
