export interface TestResult {
  id: string;
  userId: string;
  netWPM: number;
  rawWPM: number;
  accuracy: number;
  mode: string;
  duration: number;
  createdAt: Date;
}

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: Date;
}

export interface AggregationResult {
  netWPM: number | null;
  rawWPM: number | null;
  accuracy: number | null;
}

export interface Stats {
  testResults: TestResult[];
  stats: {
    _max: {
      netWPM: number | null;
      rawWPM: number | null;
      accuracy: number | null;
    };
    _avg: {
      netWPM: number | null;
      rawWPM: number | null;
      accuracy: number | null;
      duration: number | null;
    };
    _count: {
      id: number;
    };
    _sum: {
      duration: number | null;
    };
  };
  modeStats: Record<string, AggregationResult>;
  durationStats: Record<number, AggregationResult>;
}
