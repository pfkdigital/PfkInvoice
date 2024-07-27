"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSidebar } from "@/lib/SideBarContextProvider";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/ui/SideBar/sidebarLinks";
import SideBarItem from "@/ui/SideBar/SideBarItem";
import { memo } from "react";

function SideBar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const path = usePathname();

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 280 : 75 }}
      className={
        "relative py-4 h-[840px] min-w-[75px] bg-eclipse rounded-tr-[10px] rounded-br-[10px] overflow-clip"
      }
    >
      {sidebarLinks.map(({ href, icon, label }) => (
        <SideBarItem
          key={href}
          href={href}
          icon={icon}
          label={label}
          isActive={path.includes(href)}
          isSidebarOpen={isSidebarOpen}
        />
      ))}
      <Image
        src={isSidebarOpen ? "/menu-open.svg" : "/menu-close.svg"}
        alt={isSidebarOpen ? "close-icon" : "open-icon"}
        height={25}
        width={25}
        onClick={toggleSidebar}
        className="absolute bottom-5 right-5 cursor-pointer"
      />
    </motion.aside>
  );
}

export default memo(SideBar);
