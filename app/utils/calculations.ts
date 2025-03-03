// Calculation helper functions.
const calculateGrossWPM = (totalTyped: number, timeInMinutes: number) => {
  return Math.round(totalTyped / 5 / timeInMinutes);
};

const calculateNetWPM = (
  grossWPM: number,
  errors: number,
  timeInMinutes: number
) => {
  return Math.max(0, Math.round(grossWPM - errors / timeInMinutes));
};

const calculateAccuracy = (correct: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export interface Results {
  grossWPM: number;
  netWPM: number;
  accuracy: number;
}

export { calculateGrossWPM, calculateNetWPM, calculateAccuracy };
