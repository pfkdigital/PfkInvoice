"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/ui/Button/Button";
import Image from "next/image";
import UserCard from "@/app/ui/UserCard/UserCard";

function NavBar() {
  const [visibility, setVisibility] = useState(false);
  return (
    <nav
      className={
        "relative w-screen h-[90px] bg-eclipse flex items-center px-[30px] md:h-[70px] overflow-clip"
      }
    >
      <div className={"h-auto w-full flex justify-between"}>
        <Button label={"PFK Invoice"} />
        <Image
          src={"/burger.svg"}
          alt={"burger-icon"}
          className={"cursor-pointer md:invisible"}
          width={29}
          height={21}
          onClick={() => setVisibility(true)}
        />
        <div className={"w-auto hidden md:flex"}>
          <div className={"h-full flex items-center mr-[30px]"}>
            <div className={"flex relative w-[30px] h-[30px] mr-[5px]"}>
              <Image src={"/profilepic.svg"} alt={"profile-pic"} fill />
            </div>
            <div className={"flex-col"}>
              <p className={"text-[14px] leading-5 text-snowWhite mb-px"}>
                Nuh Ali
              </p>
              <p className={"text-snowWhite text-[10px] italic"}>Online</p>
            </div>
          </div>
          <Image
            src={"/logout.svg"}
            alt={"logout-icon"}
            width={24}
            height={18}
          />
        </div>
      </div>
      <motion.div
        animate={{ right: visibility ? 0 : "-100vw" }}
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
