import { create } from "zustand";

export type TimeOption = 10 | 20 | 30 | 50 | 100;

interface TestStore {
  selectedItem: string | null;
  setSelectedItem: (item: string) => void;
  selectedTime: TimeOption;
  setSelectedTime: (time: TimeOption) => void;
}

export const useMenuStore = create<TestStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  selectedTime: 30,
  setSelectedTime: (time) => set({ selectedTime: time }),
}));
