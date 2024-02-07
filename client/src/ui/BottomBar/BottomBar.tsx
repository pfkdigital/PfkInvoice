import React from "react";
import Image from "next/image";
import Link from "next/link";

const BottomBar = () => {
  const icons = [
    { src: "/home.svg", alt: "Home Icon", href: "/" },
    { src: "/invoice.svg", alt: "Invoice Icon", href: "/invoices" },
    {
      src: "/plus.svg",
      alt: "Add Icon",
      isCenter: true,
      href: "/invoices/new",
    },
    { src: "/client.svg", alt: "Client Icon", href: "/clients" },
    { src: "/settings.svg", alt: "Settings Icon", href: "/user-profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-screen h-20 bg-eclipse flex items-center md:hidden">
      <div className="w-screen h-auto flex justify-between items-center px-11">
        {icons.map(({ src, alt, isCenter, href }) => (
          <div
            key={alt}
            className={`cursor-pointer ${
              isCenter ? "rounded-xl bg-oceanBlue hover:bg-navyBlue p-3" : ""
            }`}
          >
            <Link href={href}>
              <Image src={src} alt={alt} width={25} height={25} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
