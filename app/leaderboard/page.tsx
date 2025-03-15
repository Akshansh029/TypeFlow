"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
const Leaderboard = () => {
  // using client session to get the user's session
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

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
              <Button variant="secondary" onClick={() => toast("Hello")}>
                Sonner
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
