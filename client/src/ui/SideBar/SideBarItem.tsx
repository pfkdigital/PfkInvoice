import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SidebarItemProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
  isSidebarOpen: boolean;
}

function SidebarItem({
  href,
  icon,
  label,
  isActive,
  isSidebarOpen,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center h-[50px] w-full pl-[30px] cursor-pointer ${
        isActive ? "bg-oceanBlue" : ""
      }`}
    >
      <Image
        src={icon}
        alt={`${label}-icon`}
        width={20}
        height={20}
        className="mr-[10px]"
      />
      {isSidebarOpen && (
        <p className="text-xl text-snowWhite leading-6">{label}</p>
      )}
    </Link>
  );
}

export default SidebarItem;
