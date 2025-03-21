"use client";

import { useMenuStore, Mode } from "@/lib/store";
import type { ElementType } from "react";
import { AtSign, Hash, Clock, Type, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  icon: ElementType;
  label: string;
};

type TimeOption = {
  id: number;
  icon: ElementType;
  label: string;
};

const menuItems: MenuItem[] = [
  { id: "normal", icon: Type, label: "normal" },
  { id: "medium", icon: Type, label: "medium" },
  { id: "hard", icon: Type, label: "hard" },
  { id: "punctuation", icon: AtSign, label: "punctuation" },
  { id: "numbers", icon: Hash, label: "numbers" },
  { id: "quote", icon: Quote, label: "quote" },
];

const timeOptions: TimeOption[] = [
  { id: 10, icon: Clock, label: "10" },
  { id: 20, icon: Clock, label: "20" },
  { id: 30, icon: Clock, label: "30" },
  { id: 50, icon: Clock, label: "50" },
  { id: 100, icon: Clock, label: "100" },
];

export function MenuBar() {
  const { selectedMode, setSelectedMode, selectedTime, setSelectedTime } =
    useMenuStore();

  return (
    <div className="hidden md:flex flex-col lg:flex-row min-w-full md:min-w-[600px] items-center justify-center gap-2 bg-[#1B1E2C] p-2 rounded-lg">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-1 w-full">
        {menuItems.map((item) => {
          const isSelected = selectedMode === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-300 hover:text-accent-primary hover:bg-zinc-700 gap-1 cursor-pointer",
                isSelected && "text-accent-primary"
              )}
              onClick={() => setSelectedMode(item.id as Mode)}
            >
              <item.icon
                className={cn(
                  "mr-2 h-4 w-4",
                  isSelected && "text-accent-primary"
                )}
              />
              {item.label}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-1 w-full">
        <p className="text-gray-300">Time :</p>
        {timeOptions.map((size) => {
          const isSelectedTime = selectedTime === size.id;
          return (
            <Button
              key={size.id}
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-300 hover:text-accent-primary hover:bg-zinc-700 px-2 cursor-pointer",
                isSelectedTime && "text-accent-primary"
              )}
              onClick={() => setSelectedTime(size.id)}
            >
              {size.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
