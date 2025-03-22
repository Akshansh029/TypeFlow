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
export type FontFamily =
  | "mono"
  | "sans"
  | "serif"
  | "roboto-mono"
  | "fira-code"
  | "jetbrains-mono"
  | "source-code-pro"
  | "ubuntu-mono";

interface TestStore {
  selectedMode: Mode;
  setSelectedMode: (item: Mode) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  fontSize: FontSize;
  fontFamily: FontFamily;
  setFontSize: (size: FontSize) => void;
  setFontFamily: (font: FontFamily) => void;
  isSoundEnabled: boolean;
  enableSound: () => void;
  disableSound: () => void;
  volume: number;
  setVolume: (value: number) => void;
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
  isSoundEnabled: false,
  enableSound: () => set({ isSoundEnabled: true }),
  disableSound: () => set({ isSoundEnabled: false }),
  volume: 40,
  setVolume: (value) => set({ volume: value }),
}));
