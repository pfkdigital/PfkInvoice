import React from 'react';
import Image from "next/image";
import PlusIcon from "@/../public/plus.svg"

type ButtonTypes = {
    label: string
    icon?: string
}

function renderIcon(icon: string) {
    switch (icon) {
        case "plus":
         <Image src={PlusIcon} alt={`${icon}-icon`} height={5} width={5} />
            break;
        default:
            break
    }
}

function Button({label, icon}:ButtonTypes) {

    return (
        <div className="w-auto h-auto px-4 py-1.5 text-snowWhite bg-oceanBlue cursor-pointer rounded-lg hover:bg-navyBlue">
            {icon ? renderIcon(icon) : null}
            {label && label}
        </div>
    );
}

export default Button;