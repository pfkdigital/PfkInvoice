"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { format } from "date-fns";

type DatePickerProps = {
  label: string;
  setValue: any;
  isEditMode: boolean;
};

export function DatePicker({ label, setValue }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue("paymentDue", formattedDate);
    }
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full min-h-[40px] flex-row-reverse justify-between text-left font-normal bg-eclipse border-0 md:bg-midnight md:h-10 md:w-[130px]",
            !date && "text-cloudGray",
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4 stroke-snowWhite" />
          {date ? (
            <span className={"text-cloudGray text-xs"}>
              {format(date, "yyyy-MM-dd")}
            </span>
          ) : (
            <span className={"text-xs"}>{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-eclipse md:bg-midnight">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className={"text-snowWhite"}
        />
      </PopoverContent>
    </Popover>
  );
}
