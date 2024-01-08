import React from "react";
import Image from "next/image";

const BottomBar = () => {
  const icons = [
    { src: "/home.svg", alt: "Home Icon" },
    { src: "/invoice.svg", alt: "Invoice Icon" },
    { src: "/plus.svg", alt: "Add Icon", isCenter: true },
    { src: "/client.svg", alt: "Client Icon" },
    { src: "/settings.svg", alt: "Settings Icon" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-screen h-20 bg-eclipse flex items-center md:hidden">
      <div className="w-screen h-auto flex justify-between items-center px-11">
        {icons.map(({ src, alt, isCenter }) => (
          <div
            key={alt}
            className={`cursor-pointer ${
              isCenter ? "rounded-xl bg-oceanBlue hover:bg-navyBlue p-3" : ""
            }`}
          >
            <Image src={src} alt={alt} width={25} height={25} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
