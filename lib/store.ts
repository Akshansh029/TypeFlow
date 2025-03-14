import { create } from "zustand";

export type TimeOption = 10 | 20 | 30 | 50 | 100;

export type Mode =
  | "normal"
  | "medium"
  | "hard"
  | "numbers"
  | "punctuation"
  | "quote";

export type FontSize = "small" | "medium" | "large" | "xl";
export type FontFamily = "mono" | "sans" | "serif" | "roboto-mono";

interface TestStore {
  selectedMode: Mode;
  setSelectedMode: (item: Mode) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  fontSize: FontSize;
  fontFamily: FontFamily;
  setFontSize: (size: FontSize) => void;
  setFontFamily: (font: FontFamily) => void;
}

export const useMenuStore = create<TestStore>((set) => ({
  selectedMode: "medium",
  setSelectedMode: (item) => set({ selectedMode: item }),
  selectedTime: 30,
  setSelectedTime: (time) => set({ selectedTime: time }),
  fontSize: "large",
  fontFamily: "roboto-mono",
  setFontSize: (size) => set({ fontSize: size }),
  setFontFamily: (font) => set({ fontFamily: font }),
}));
