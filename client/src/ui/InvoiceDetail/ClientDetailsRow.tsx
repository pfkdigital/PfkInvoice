import React from "react";

type ClientDetailsRowProps = {
  label: string;
  value: string;
};

const ClientDetailsRow = ({ label, value }: ClientDetailsRowProps) => (
  <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 md:mb-2.5">
    <p className="text-oceanBlue text-sm font-bold">{label}</p>
    <p className="text-xs text-smokeGray md:text-sm">{value}</p>
  </div>
);

export default ClientDetailsRow;
