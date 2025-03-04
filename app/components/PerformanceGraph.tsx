"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Results } from "../utils/calculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WPMDataPoint {
  time: number;
  wpm: number;
}

interface PerformanceGraphProps {
  results: Results;
  wpmData: WPMDataPoint[];
}

export default function PerformanceGraph({ wpmData }: PerformanceGraphProps) {
  const data = {
    labels: wpmData.map((point) => `${point.time}`),
    datasets: [
      {
        label: "Net WPM",
        data: wpmData.map((point) => point.wpm),
        borderColor: "rgba(34, 197, 94, 0.8)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `WPM: ${Math.round(context.raw)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "wpm",
          color: "#9CA3AF",
        },
        grid: {
          color: "rgba(75, 85, 99, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
          callback: (value: number) => Math.round(value),
        },
      },
      x: {
        title: {
          display: true,
          text: "time (s)",
          color: "#9CA3AF",
        },
        grid: {
          display: true,
        },
        ticks: {
          color: "#9CA3AF",
          maxTicksLimit: 14,
        },
      },
    },
  };

  return (
    <div className="min-w-[800px] mx-auto mt-8 p-4 bg-gray-800/30 rounded-lg h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
}
