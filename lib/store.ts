import { create } from "zustand";

export type TimeOption = 10 | 20 | 30 | 50 | 100;

export type Mode =
  | "normal"
  | "medium"
  | "hard"
  | "numbers"
  | "punctuation"
  | "quote";

interface TestStore {
  selectedMode: Mode;
  setSelectedMode: (item: Mode) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
}

export const useMenuStore = create<TestStore>((set) => ({
  selectedMode: "medium", // Default mode set to "medium"
  setSelectedMode: (item) => set({ selectedMode: item }),
  selectedTime: 30,
  setSelectedTime: (time) => set({ selectedTime: time }),
}));
