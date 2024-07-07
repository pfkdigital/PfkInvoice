import React from "react";

type TotalDisplayProps = {
  total: number;
};

const TotalDisplay = ({ total }: TotalDisplayProps) => (
  <div className="absolute bottom-0 left-0 w-full hidden md:flex justify-center items-center bg-oceanBlue rounded-[10px] md:justify-between md:mb-2.5 md:px-4 md:h-[30px]">
    <p className="text-base text-cloudGray font-bold">Total:</p>
    <p className="ml-4 text-cloudGray text-base font-bold">{`$ ${total}`}</p>
  </div>
);

export default TotalDisplay;
