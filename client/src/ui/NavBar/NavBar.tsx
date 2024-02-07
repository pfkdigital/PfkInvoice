"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserCard from "@/ui/UserCard/UserCard";
import { SignOutButton, useAuth, useClerk, UserButton } from "@clerk/nextjs";

function NavBar() {
  const [visibility, setVisibility] = useState(false);
  const { userId } = useAuth();
  const { signOut } = useClerk();

  return (
    <nav
      className={
        "relative w-screen h-[90px] bg-eclipse flex items-center px-[30px] md:h-[70px] overflow-clip"
      }
    >
      <div className={"h-auto w-full flex justify-between"}>
        <Button>PFK Invoice</Button>
        <Image
          src={"/burger.svg"}
          alt={"burger-icon"}
          className={"cursor-pointer md:invisible"}
          width={29}
          height={21}
          onClick={() => setVisibility(true)}
          priority
        />
        <div className={"w-auto hidden md:flex"}>
          <UserButton afterSignOutUrl="/sign-in" />
          <SignOutButton signOutCallback={() => signOut()}>
            <Image
              src={"/logout.svg"}
              alt={"logout-icon"}
              width={24}
              height={18}
              className={"cursor-pointer"}
            />
          </SignOutButton>
        </div>
      </div>
      <motion.div
        animate={{
          right: visibility ? 0 : "-100vw",
          opacity: visibility ? 1 : 0,
        }}
        className={
          "fixed top-0 right-[-100vw] w-[277px] h-[500px] bg-oceanBlue z-40"
        }
      >
        <div
          className={"w-full h-[90px] bg-eclipse flex items-center pl-[22px]"}
        >
          <Image
            src={"/arrow-left.svg"}
            alt={"close-icon"}
            width={25}
            height={20}
            onClick={() => setVisibility(false)}
            className={"cursor-pointer"}
          />
        </div>
        <div className={"pt-5 px-10 w-full h-screen bg-midnight"}>
          <UserCard />
          <div
            className={
              "h-10 w-full p-5 cursor-pointer rounded-[10px] flex items-center bg-oceanBlue ease-in duration-75"
            }
          >
            <p className={"text-[16px] leading-5 text-snowWhite mb-[5px]"}>
              Profile
            </p>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}

export default NavBar;
