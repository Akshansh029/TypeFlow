import Image from "next/image";
import React from "react";
import { Stats, User } from "./interfaces";
import { User2 } from "lucide-react";

interface ProfileDisplayProps {
  user: User | null;
  data: Stats | null;
}

const ProfileSummary = ({ user, data }: ProfileDisplayProps) => {
  return (
    <section className="w-full flex flex-col md:flex-row gap-6 bg-[#1a1e2a] rounded-lg px-6 py-8 text-white">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative">
          {user?.image ? (
            <Image
              className="w-20 h-20 rounded-full"
              src={user.image || "/placeholder.svg"}
              width={80}
              height={80}
              alt={user?.name ?? "Profile"}
              priority
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
              <User2 className="w-12 h-12" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
          </div>
          <p className="text-sm text-gray-400">Joined 14 Mar 2025</p>
        </div>
      </div>

      <div className="flex-1 mt-6 md:mt-auto">
        <div className="text-center text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">tests started</span>
              <span className="text-[42px] font-bold text-neutral-200">
                {data?.testResults.length || "-"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">highest wpm</span>
              <span className="text-[42px] font-bold text-neutral-200">
                {data?.stats._max.netWPM || "-"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">time typing</span>
              <span className="text-[42px] font-bold text-neutral-200">
                {new Date((data?.stats._sum.duration ?? 0) * 1000)
                  .toISOString()
                  .substr(11, 8) || "--:-:--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;
