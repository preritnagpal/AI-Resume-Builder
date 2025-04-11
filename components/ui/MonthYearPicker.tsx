// components/ui/MonthYearPicker.tsx
"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface MonthYearPickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  maxDate?: Date;
  minDate?: Date;
}

export function MonthYearPicker({
  selected,
  onChange,
  maxDate,
  minDate,
}: MonthYearPickerProps) {
  const [month, setMonth] = useState<number>(selected?.getMonth() ?? new Date().getMonth());
  const [year, setYear] = useState<number>(selected?.getFullYear() ?? new Date().getFullYear());

  // Sync month/year with selected date
  useEffect(() => {
    if (selected) {
      setMonth(selected.getMonth());
      setYear(selected.getFullYear());
    }
  }, [selected]);

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value);
    setMonth(newMonth);
    // Update selected date if year is already set
    if (year) {
      const newDate = new Date(year, newMonth, 1);
      onChange(newDate);
    }
  };

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value);
    setYear(newYear);
    // Update selected date if month is already set
    if (month !== undefined) {
      const newDate = new Date(newYear, month, 1);
      onChange(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "MMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          <div className="flex gap-2 mb-4">
            <Select value={month.toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }).map((_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {format(new Date(2000, i, 1), "MMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year.toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }).map((_, i) => {
                  const y = new Date().getFullYear() - 10 + i;
                  return (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            month={new Date(year, month)}
            onMonthChange={(date) => {
              setMonth(date.getMonth());
              setYear(date.getFullYear());
            }}
            selected={selected ?? undefined}
            onSelect={(date) => onChange(date ?? null)}
            disabled={(date) => 
              (maxDate ? date > maxDate : false) || 
              (minDate ? date < minDate : false)
            }
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}