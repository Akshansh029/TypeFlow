const wpmHistory: number[] = [];

const calculateGrossWPM = (totalTyped: number, timeInSeconds: number) => {
  if (timeInSeconds === 0) return 0;

  const timeInMinutes = timeInSeconds / 60;
  return Math.round(totalTyped / 5 / timeInMinutes);
};

const calculateNetWPM = (
  grossWPM: number,
  errors: number,
  timeInMinutes: number
) => {
  const netWPM = Math.max(0, Math.round(grossWPM - errors / timeInMinutes));

  wpmHistory.push(netWPM);

  return netWPM;
};

const calculateAccuracy = (correct: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

const calculateAverageWPM = () => {
  if (wpmHistory.length === 0) return 0;

  const sum = wpmHistory.reduce((acc, wpm) => acc + wpm, 0);
  return Math.round(sum / wpmHistory.length);
};

export interface Results {
  grossWPM: number;
  netWPM: number;
  accuracy: number;
  averageWPM: number;
}

export {
  calculateGrossWPM,
  calculateNetWPM,
  calculateAccuracy,
  calculateAverageWPM,
  wpmHistory,
};
