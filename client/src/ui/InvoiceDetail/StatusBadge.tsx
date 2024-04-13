import React from "react";

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <div className="mx-2.5 px-4 py-2.5 bg-oceanBlue text-xs text-cloudGray max-h-5 rounded-[10px] flex items-center justify-center font-bold md:mx-5">
    <span>{status}</span>
  </div>
);

export default StatusBadge;
