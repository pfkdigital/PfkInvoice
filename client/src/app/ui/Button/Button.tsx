import React from 'react';
import Image from "next/image";


type ButtonTypes = {
    children: React.ReactNode
}



function Button({children}:ButtonTypes) {

    return (
        <div className="w-auto h-auto flex justify-between px-4 py-1.5 text-snowWhite bg-oceanBlue cursor-pointer rounded-lg hover:bg-navyBlue">
            {children}
        </div>
    );
}

export default Button;