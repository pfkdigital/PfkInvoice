"use client";

import * as React from "react";
import { ChevronDown as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { format } from "date-fns";

type DatePickerProps = {
  label: string;
  selectedDate: string | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  isEditMode: boolean;
};

export function DatePicker({
  isEditMode,
  label,
  selectedDate,
  setSelectedDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  useEffect(() => {
    if (isEditMode && selectedDate) {
      setDate(new Date(selectedDate));
    }
  }, []);

  useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-mm-dd");
      setSelectedDate(formattedDate);
    }
  }, [date, setSelectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full rounded-[10px] h-[30px] flex-row-reverse justify-between text-left font-normal bg-eclipse border-0 md:bg-midnight md:h-10 md:w-[130px]",
            !date && "text-cloudGray",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 stroke-cloudGray" />
          {date ? (
            <span className={"text-cloudGray"}>{selectedDate}</span>
          ) : (
            <span>{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-eclipse text-oceanBlue md:bg-midnight">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className={"text-snowWhite rounded-[10px]"}
        />
      </PopoverContent>
    </Popover>
  );
}
