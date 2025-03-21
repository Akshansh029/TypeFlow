"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex justify-center min-h-[calc(100vh-84px)] bg-primary px-12 py-8">
      {loading ? (
        <div className="flex flex-col gap-4 my-auto items-center justify-center">
          <h1 className="font-medium text-3xl text-neutral-200">
            Downloading your awesome stats...
          </h1>
          <ClimbingBoxLoader color="#05df72" size={20} />
        </div>
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
                    <TableCell className="font-medium text-neutral-100 text-center py-4 hover:bg-accent">
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
        </main>
      )}
    </div>
  );
}
