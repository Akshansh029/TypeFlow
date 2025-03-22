import React from "react";
import { Stats } from "./interfaces";

interface ProfileDisplayProps {
  data: Stats | null;
}
const DetailedStats = ({ data }: ProfileDisplayProps) => {
  return (
    <section className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-neutral-200">
        {/* Highest stats */}
        <div className="space-y-4 text-center md:text-start">
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              tests completed
            </p>
            <span className="text-5xl font-medium">
              {data?.stats?._count?.id || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">highest wpm</p>
            <span className="text-5xl font-medium">
              {data?.stats?._max.netWPM || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              highest raw wpm
            </p>
            <span className="text-5xl font-medium">
              {data?.stats?._max?.rawWPM || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              highest accuracy
            </p>
            <span className="text-5xl font-medium">
              {data?.stats?._max?.accuracy
                ? data?.stats?._max?.accuracy + "%"
                : "-"}
            </span>
          </div>
        </div>

        {/* Average Stats */}
        <div className="space-y-4 text-center md:text-start">
          <div>
            <p className="text-base text-gray-500 tracking-wide">average wpm</p>
            <span className="text-5xl font-medium">
              {Math.round(Number(data?.stats?._avg?.netWPM)) || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              average raw wpm
            </p>
            <span className="text-5xl font-medium">
              {Math.round(Number(data?.stats?._avg?.rawWPM)) || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              avg accuracy
            </p>
            <span className="text-5xl font-medium">
              {Math.round(Number(data?.stats?._avg?.accuracy)) || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              avg duration of test
            </p>
            <span className="text-5xl font-medium">
              {Math.round(Number(data?.stats?._avg?.duration)) || "-"}
            </span>
          </div>
        </div>

        {/* Last 5 tests stats */}
        <div className="space-y-4 text-center md:text-start">
          {/* Time Typing */}
          <div>
            <p className="text-base text-gray-500 tracking-wide">time typing</p>
            <span className="text-5xl font-medium">
              {new Date((data?.stats._sum.duration ?? 0) * 1000)
                .toISOString()
                .substr(11, 8) || "--:-:--"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              average wpm (last 5 tests)
            </p>
            <span className="text-5xl font-medium">
              {Math.round(Number(data?.statsLastFive?._avg?.netWPM)) || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              average raw wpm (last 5 tests)
            </p>
            <span className="text-5xl font-medium">
              {Math.round(Number(data?.statsLastFive?._avg?.rawWPM)) || "-"}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-500 tracking-wide">
              avg accuracy (last 5 tests)
            </p>
            <span className="text-5xl font-medium">
              {data?.statsLastFive?._avg?.accuracy
                ? data?.statsLastFive?._avg?.accuracy + "%"
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedStats;
