import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
const Leaderboard = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="min-h-[calc(100vh-84px)] bg-primary p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        {session && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium text-white">
                {session.user?.name}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
