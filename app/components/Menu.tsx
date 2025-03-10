"use client";

import { useMenuStore, Mode } from "@/lib/store";
import type { ElementType } from "react";
import { AtSign, Hash, Clock, Type, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  icon: ElementType;
  label: string;
};

type SizeOption = {
  id: number;
  icon: ElementType;
  label: string;
};

// Menu categories
const menuItems: MenuItem[] = [
  { id: "normal", icon: Type, label: "normal" },
  { id: "medium", icon: Type, label: "medium" },
  { id: "hard", icon: Type, label: "hard" },
  { id: "punctuation", icon: AtSign, label: "punctuation" },
  { id: "numbers", icon: Hash, label: "numbers" },
  { id: "quote", icon: Quote, label: "quote" },
];

// Time selection options
const sizeOptions: SizeOption[] = [
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
    <div className="min-w-[600px] flex items-center justify-center gap-6 bg-[#1a1a1a] p-2 rounded-lg">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {menuItems.map((item) => {
          const isSelected = selectedMode === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-300 hover:text-white hover:bg-gray-700 gap-1",
                isSelected && "text-green-400"
              )}
              onClick={() => setSelectedMode(item.id as Mode)}
            >
              <item.icon
                className={cn("mr-2 h-4 w-4", isSelected && "text-green-400")}
              />
              {item.label}
            </Button>
          );
        })}
      </div>
      <div className="flex items-center justify-center space-x-1">
        <p className="text-gray-300">Time : </p>
        {sizeOptions.map((size) => {
          const isSelectedTime = selectedTime === size.id;
          return (
            <Button
              key={size.id}
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-300 hover:text-white hover:bg-gray-700 px-2",
                isSelectedTime && "text-green-400"
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
