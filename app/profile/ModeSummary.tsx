import React from "react";
import { Stats } from "./interfaces";

interface ProfileDisplayProps {
  data: Stats | null;
}

const ModeSummary = ({ data }: ProfileDisplayProps) => {
  return (
    <section className="w-full flex flex-col md:flex-row gap-6 bg-transparent py-8 text-white">
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-0 justify-around rounded-lg bg-[#1a1e2a] px-2 py-6">
        {data?.modeStats &&
          Object.entries(data?.modeStats).map(([mode, stats]) => (
            <div key={mode} className=" flex flex-col items-center ">
              <span className="text-sm text-gray-400">{mode}</span>
              <span className="text-[42px] text-neutral-100">
                {stats.netWPM || "-"}
              </span>
              <span className="text-2xl text-neutral-300">
                {stats.accuracy ? stats.accuracy + "%" : "-"}
              </span>
            </div>
          ))}
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-0 justify-around rounded-lg bg-[#1a1e2a] px-2 py-6">
        {data?.modeStats &&
          Object.entries(data?.durationStats).map(([mode, stats]) => (
            <div key={mode} className=" flex flex-col items-center ">
              <span className="text-sm text-gray-400">{mode} secs</span>
              <span className="text-[42px] text-neutral-100">
                {stats.netWPM || "-"}
              </span>
              <span className="text-2xl text-neutral-300">
                {stats.accuracy ? stats.accuracy + "%" : "-"}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ModeSummary;
