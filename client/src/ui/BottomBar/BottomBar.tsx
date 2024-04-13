"use client";

import BottomBarIcon from "@/ui/BottomBar/BottomBarIcon";
import { icons } from "@/ui/BottomBar/buttonIcons";
import SignOutIcon from "@/ui/SignOutIcon/SignOutIcon";
import { useUser } from "@clerk/nextjs";

const BottomBar = () => {
  const { user } = useUser();
  return (
    <div className="fixed bottom-0 left-0 w-screen h-20 bg-eclipse flex items-center md:hidden">
      <div className="w-full max-w-[500px] h-auto flex justify-between items-center mx-auto px-11">
        {icons.map((icon) => (
          <BottomBarIcon
            key={icon.alt}
            src={icon.src}
            srcActive={icon.active}
            alt={icon.alt}
            isCenter={icon.isCenter}
            href={icon.href}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
