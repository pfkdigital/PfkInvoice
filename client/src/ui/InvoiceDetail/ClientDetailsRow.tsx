import React from "react";

type ClientDetailsRowProps = {
  label: string;
  value: string;
};

const ClientDetailsRow = ({ label, value }: ClientDetailsRowProps) => (
  <div className="flex items-center justify-between md:mb-2.5 md:flex-col md:items-start">
    <p className="text-sm font-bold mr-1.5 md:mb-1.5 md:mr-0 ">{label}</p>
    <p className="text-xs text-smokeGray md:text-sm">{value}</p>
  </div>
);

export default ClientDetailsRow;
