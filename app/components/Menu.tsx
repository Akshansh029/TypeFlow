"use client";

import type React from "react";

import { useState } from "react";
import {
  AtSign,
  Hash,
  Clock,
  Type,
  Quote,
  Triangle,
  Wrench,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  icon: React.ElementType;
  label: string;
};

const menuItems: MenuItem[] = [
  { id: "punctuation", icon: AtSign, label: "punctuation" },
  { id: "numbers", icon: Hash, label: "numbers" },
  { id: "words", icon: Type, label: "words" },
  { id: "quote", icon: Quote, label: "quote" },
  { id: "zen", icon: Triangle, label: "zen" },
  { id: "custom", icon: Wrench, label: "custom" },
];

const sizeOptions: MenuItem[] = [
  { id: "10", icon: Clock, label: "10" },
  { id: "25", icon: Clock, label: "25" },
  { id: "50", icon: Clock, label: "50" },
  { id: "100", icon: Clock, label: "100" },
];

export function MenuBar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="w-min flex items-center justify-center gap-6 bg-[#1a1a1a] p-2 rounded-lg">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {menuItems.map((item) => {
          const isSelected = selectedItem === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-300 hover:text-white hover:bg-gray-700 gap-1",
                isSelected && "text-green-400"
              )}
              onClick={() => setSelectedItem(item.id)}
            >
              <item.icon
                className={cn("mr-2 h-4 w-4", isSelected && "text-green-400")}
              />
              {item.label}
            </Button>
          );
        })}
      </div>
      <div className="flex items-center space-x-1">
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
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-full h-8 w-8"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
