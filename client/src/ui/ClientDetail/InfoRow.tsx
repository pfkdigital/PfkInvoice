import React from "react";

type InfoRowProps = {
  label: string;
  value: string | number;
};

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div>
      <p className={"text-3 text-oceanBlue font-bold md:text-snowWhite"}>
        {label}
      </p>
      <p className={"text-3 text-smokeGray font-normal"}>{value}</p>
    </div>
  );
};

export default InfoRow;
