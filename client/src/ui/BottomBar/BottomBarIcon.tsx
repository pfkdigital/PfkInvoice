"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type BottomBarIconProps = {
  src: string;
  srcActive: string;
  alt: string;
  isCenter?: boolean;
  href: string;
};

const BottomBarIcon = ({
  src,
  srcActive,
  alt,
  isCenter,
  href,
}: BottomBarIconProps) => {
  const [activeIcon, setActiveIcon] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === href) {
      setActiveIcon(true);
    } else {
      setActiveIcon(false);
    }
  }, [pathname]);

  return (
    <div
      key={alt}
      className={`cursor-pointer ${
        isCenter ? "rounded-xl bg-oceanBlue hover:bg-navyBlue p-3" : ""
      }`}
    >
      <Link href={href}>
        <Image
          src={activeIcon ? srcActive : src}
          alt={alt}
          width={25}
          height={25}
        />
      </Link>
    </div>
  );
};

export default BottomBarIcon;
