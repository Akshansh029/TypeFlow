"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/signout";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Stats {
  testResults: any[];
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
}

export function ProfileClient({ user }: { user: User | null }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  console.log(stats);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-84px)] bg-primary px-4">
      <main className="flex flex-col items-center space-y-6 bg-neutral-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* User Info */}
        <div className="flex flex-col items-center">
          {user?.image && (
            <Image
              className="w-24 h-24 rounded-full border-4 border-zinc-200 shadow-lg"
              src={user?.image ?? ""}
              width={96}
              height={96}
              alt={user?.name ?? "Profile Pic"}
              priority
            />
          )}
          <h1 className="text-2xl font-semibold text-gray-900">
            {user?.name ?? "User"}
          </h1>
          <h2 className="text-sm text-gray-600">Joined 14 Mar 2025</h2>
        </div>

        {/* Stats Section */}
        {loading ? (
          <p className="text-xl font-semibold">
            Downloading your awesome stats...
          </p>
        ) : stats ? (
          <div className="grid grid-cols-2 gap-4 w-full text-gray-900">
            <div className="text-left">
              <p className="font-bold">Tests Started:</p>
              <p>{stats.testResults.length}</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Tests Completed:</p>
              <p>
                {stats.stats._count.id} (
                {(
                  (stats.stats._count.id / stats.testResults.length) *
                  100
                ).toFixed(0)}
                %)
              </p>
            </div>
            <div className="text-left">
              <p className="font-bold">Highest WPM:</p>
              <p>{stats.stats._max.netWPM ?? 0}</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Avg WPM:</p>
              <p>{Math.round(stats.stats._avg.netWPM ?? 0)}</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Highest Raw:</p>
              <p>{stats.stats._max.rawWPM ?? 0}</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Avg Raw:</p>
              <p>{Math.round(stats.stats._avg.rawWPM ?? 0)}</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Highest Accuracy:</p>
              <p>{stats.stats._max.accuracy ?? 0}%</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Avg Accuracy:</p>
              <p>{Math.round(stats.stats._avg.accuracy ?? 0)}%</p>
            </div>
            <div className="text-left">
              <p className="font-bold">Total Time Typing:</p>
              <p>
                {new Date((stats.stats._sum.duration ?? 0) * 1000)
                  .toISOString()
                  .substr(11, 8)}
              </p>
            </div>
          </div>
        ) : (
          <p>No stats available.</p>
        )}

        {/* Sign Out Button */}
        <form action={signOutAction} className="w-full">
          <Button
            type="submit"
            variant="destructive"
            className="w-full cursor-pointer"
          >
            Sign Out
          </Button>
        </form>
      </main>
    </div>
  );
}
