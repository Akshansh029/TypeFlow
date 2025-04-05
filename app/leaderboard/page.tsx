"use client";

import React, { useState, useEffect } from "react";
import { Crown, User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { format } from "date-fns";

interface LeaderboardEntry {
  id: string;
  userId: string;
  netWPM: number | null;
  rawWPM: number | null;
  accuracy: number | null;
  createdAt: string;
  user?: {
    name?: string | null;
    image?: string | null;
  };
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard`
        );
        // If the content-type indicates HTML
        const contentType = res.headers.get("content-type");
        if (!res.ok || (contentType && contentType.includes("text/html"))) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const json = await res.json();
        console.log(json);

        setData(json?.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center min-h-[calc(100vh-88px)] bg-primary">
        <h1 className="font-medium text-3xl text-neutral-200">
          Loading Leaderboard...
        </h1>
        <ClimbingBoxLoader color="#05df72" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-88px)] bg-primary">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-88px)] bg-primary">
        <p className="text-neutral-200 text-2xl">
          No leaderboard data available.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-primary flex items-center justify-center">
      <div className="container px-4 py-8 bg-primary min-h-[calc(100vh-88px)] w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-neutral-100">
          All-time Leaderboard
        </h1>

        <Table className="min-w-full border border-gray-700 rounded-md overflow-hidden px-4">
          <TableHeader>
            <TableRow className="bg-gray-800">
              <TableHead className="w-[100px] text-center text-gray-300">
                #
              </TableHead>
              <TableHead className="text-left text-gray-300">Name</TableHead>
              <TableHead className="text-left text-gray-300">WPM</TableHead>
              <TableHead className="text-left text-gray-300">
                Accuracy
              </TableHead>
              <TableHead className="text-left text-gray-300">Raw</TableHead>
              <TableHead className="text-left text-gray-300">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry, index) => {
              const rank = index + 1;
              const userName = entry.user?.name ?? "Unknown";
              const userImage = entry.user?.image ?? "";
              const wpm =
                entry.netWPM != null ? entry.netWPM.toFixed(2) : "N/A";
              const raw =
                entry.rawWPM != null ? entry.rawWPM.toFixed(2) : "N/A";
              const accuracy =
                entry.accuracy != null
                  ? `${entry.accuracy.toFixed(2)}%`
                  : "N/A";
              const dateStr = entry?.createdAt
                ? format(new Date(entry?.createdAt), "h:mm a, d MMMM, yyyy")
                : "N/A";

              return (
                <TableRow key={entry.id} className="border-b border-gray-700">
                  <TableCell className="font-medium py-5 px-4 text-center">
                    {rank === 1 ? (
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-400 mx-auto" />
                      </div>
                    ) : (
                      <span className="text-neutral-100">{rank}</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4 flex-1/2">
                      <Avatar className="h-8 w-8">
                        {userImage ? (
                          <AvatarImage src={userImage} alt={userName} />
                        ) : (
                          <AvatarFallback>
                            <UserIcon className="h-5 w-5" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-white">{userName}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-200">{wpm}</TableCell>
                  <TableCell className="text-gray-200">{accuracy}</TableCell>
                  <TableCell className="text-gray-200">{raw}</TableCell>
                  <TableCell className="text-gray-200">{dateStr}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
