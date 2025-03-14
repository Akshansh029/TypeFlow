const wpmHistory: number[] = [];

const calculateGrossWPM = (totalTyped: number, timeInSeconds: number) => {
  if (timeInSeconds === 0) return 0;

  const timeInMinutes = Math.max(1 / 60, timeInSeconds / 60); // Prevents divide by zero issues
  return Math.round(totalTyped / 5 / timeInMinutes);
};

const calculateNetWPM = (
  grossWPM: number,
  errors: number,
  timeInMinutes: number
) => {
  const netWPM = Math.max(0, Math.round(grossWPM - errors / 5 / timeInMinutes));
  return netWPM;
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

export { calculateGrossWPM, calculateNetWPM, calculateAccuracy, wpmHistory };
