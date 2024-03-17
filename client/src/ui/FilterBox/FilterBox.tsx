"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FilterIcon from "@/../public/filter.svg";
import ChevronIcon from "@/../public/chevron-down.svg";
import Checkbox from "../Checkbox/Checkbox";

interface FilterBoxProps {
  isVisible: boolean;
  toggleVisibility: Dispatch<SetStateAction<boolean>>;
  statusFilter: "" | "Unpaid" | "Paid";
  setStatusFilter: Dispatch<SetStateAction<"Unpaid" | "Paid" | "">>;
}

const FilterBox = ({
  isVisible,
  toggleVisibility,
  statusFilter,
  setStatusFilter,
}: FilterBoxProps) => {
  return (
    <div className="relative w-auto bg-midnight rounded-[10px] cursor-pointer z-40">
      <div
        className="flex justify-between items-center mx-[15px] my-[9px]"
        onClick={() => toggleVisibility(!isVisible)}
      >
        <Image src={FilterIcon} height={13} width={17} alt="filter-icon" />
        <p className="text-[14px] leading-[17px] text-snowWhite mx-[10px]">
          Filters
        </p>
        <Image src={ChevronIcon} height={9} width={9} alt="chevron-icon" />
      </div>
      {isVisible && (
        <div className="absolute top-0 left-0 w-full h-auto bg-midnight rounded-[10px]">
          <div
            className="flex justify-between items-center mx-[15px] my-[9px] border-b border-b-oceanBlue pb-2.5"
            onClick={() => toggleVisibility(false)}
          >
            <Image src={FilterIcon} height={13} width={17} alt="filter-icon" />
            <p className="text-[14px] leading-[17px] text-snowWhite mx-[10px]">
              Filters
            </p>
            <Image src={ChevronIcon} height={9} width={9} alt="chevron-icon" />
          </div>
          <div className="flex-col mx-[15px]">
            <div>
              <p className="text-smokeGray text-xs font-normal">Status:</p>
            </div>
            <div className="flex-col w-full mb-[15px] mt-[5px]">
              <Checkbox
                label="Paid"
                currentFilter={statusFilter}
                setCurrentFilter={setStatusFilter}
              />
              <Checkbox
                label="Unpaid"
                currentFilter={statusFilter}
                setCurrentFilter={setStatusFilter}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
