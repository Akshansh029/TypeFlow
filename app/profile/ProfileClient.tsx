"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/signout";
import { Stats, User } from "./interfaces";
import ProfileSummary from "./ProfileSummary";
import ModeSummary from "./ModeSummary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProfileClient({ user }: { user: User | null }) {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  console.log(data?.testResults);

  return (
    <div className="flex justify-center min-h-[calc(100vh-84px)] bg-primary px-12 py-8">
      {loading ? (
        <h1 className="font-semibold text-3xl text-neutral-200">
          Downloading your awesome stats...
        </h1>
      ) : (
        <main className="w-full flex flex-col gap-4">
          <ProfileSummary user={user} data={data} />
          <ModeSummary data={data} />
          <div className="w-full bg-[#1a1e2a] rounded-sm py-2">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className=" text-gray-400 text-center">
                    wpm
                  </TableHead>
                  <TableHead className=" text-gray-400 text-center">
                    raw
                  </TableHead>
                  <TableHead className=" text-gray-400 text-center">
                    accuracy
                  </TableHead>
                  <TableHead className=" text-gray-400 text-center">
                    mode
                  </TableHead>
                  <TableHead className=" text-gray-400 text-center">
                    duration
                  </TableHead>
                  <TableHead className=" text-gray-400 text-center">
                    date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.testResults.map((test, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-slate-800" : "bg-transparent"
                    }
                  >
                    <TableCell className="font-medium text-neutral-100 text-center py-4">
                      {test.netWPM}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-100 text-center py-4">
                      {test.rawWPM}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-100 text-center py-4">
                      {test.accuracy}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-100 text-center py-4">
                      {test.mode}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-100 text-center py-4">
                      {test.duration}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-100 text-center py-4">
                      {format(new Date(test.createdAt), "d MMM, yyyy h:mm a")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
      )}
    </div>
  );
}

// <div className="flex flex-col items-center">
//   {user?.image && (
//     <Image
//       className="w-24 h-24 rounded-full border-4 border-zinc-200 shadow-lg"
//       src={user?.image ?? ""}
//       width={96}
//       height={96}
//       alt={user?.name ?? "Profile Pic"}
//       priority
//     />
//   )}
//   <h1 className="text-2xl font-semibold text-gray-900">
//     {user?.name ?? "User"}
//   </h1>
//   <h2 className="text-sm text-gray-600">Joined 14 Mar 2025</h2>
// </div>

// {/* Stats Section */}
// {loading ? (
//   <p className="text-xl font-semibold">
//     Downloading your awesome stats...
//   </p>
// ) : stats ? (
//   <div className="grid grid-cols-2 gap-4 w-full text-gray-900">
//     <div className="text-left">
//       <p className="font-bold">Tests Started:</p>
//       <p>{stats.testResults.length}</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Tests Completed:</p>
//       <p>
//         {stats.stats._count.id} (
//         {(
//           (stats.stats._count.id / stats.testResults.length) *
//           100
//         ).toFixed(0)}
//         %)
//       </p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Highest WPM:</p>
//       <p>{stats.stats._max.netWPM ?? 0}</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Avg WPM:</p>
//       <p>{Math.round(stats.stats._avg.netWPM ?? 0)}</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Highest Raw:</p>
//       <p>{stats.stats._max.rawWPM ?? 0}</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Avg Raw:</p>
//       <p>{Math.round(stats.stats._avg.rawWPM ?? 0)}</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Highest Accuracy:</p>
//       <p>{stats.stats._max.accuracy ?? 0}%</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Avg Accuracy:</p>
//       <p>{Math.round(stats.stats._avg.accuracy ?? 0)}%</p>
//     </div>
//     <div className="text-left">
//       <p className="font-bold">Total Time Typing:</p>
//       <p>
//         {new Date((stats.stats._sum.duration ?? 0) * 1000)
//           .toISOString()
//           .substr(11, 8)}
//       </p>
//     </div>
//   </div>
// ) : (
//   <p>No stats available.</p>
// )}

// {/* Sign Out Button */}
// <form action={signOutAction} className="w-full">
//   <Button
//     type="submit"
//     variant="destructive"
//     className="w-full cursor-pointer"
//   >
//     Sign Out
//   </Button>
// </form>
