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

interface PerformanceGraphProps {
  results: Results;
}

export default function PerformanceGraph({ results }: PerformanceGraphProps) {
  const data = {
    labels: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
    datasets: [
      {
        label: "Net WPM",
        data: [0, 0, 0, 0, 0, 0, results.netWPM],
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
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(75, 85, 99, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
          stepSize: 10,
        },
        title: {
          display: true,
          text: "wpm",
          color: "#9CA3AF",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
        },
        title: {
          display: true,
          text: "Time (s)",
          color: "#9CA3AF",
        },
      },
    },
  };

  return (
    <div className="min-w-[700px] mt-8 p-4 bg-gray-800/30 rounded-lg h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
}
