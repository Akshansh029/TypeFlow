import React from "react";
import { redirect } from "next/navigation";

import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { ArrowUpLeft, Construction } from "lucide-react";
import Link from "next/link";
const Leaderboard = async () => {
  // using server session to get the user's session
  // const session = await getServerSession(options);
  // if (!session) {
  //   redirect("/");
  // }

  return (
    <div className="min-h-[calc(100vh-84px)] bg-primary p-8 flex flex-col items-center justify-center gap-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Construction className="w-15 h-15 text-zinc-200" />

        <h2 className="text-2xl text-zinc-200 font-bold">
          Developing Leaderboard page...
        </h2>
        <p className="text-zinc-400">
          This page is currently under development. Please check back soon.
        </p>
        <Link href="/" className="text-indigo-500! flex items-center gap-2">
          <ArrowUpLeft className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
