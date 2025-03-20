"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { Github } from "lucide-react";
export const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        className="flex-1 bg-[#1e1e26] py-2 text-gray-300 hover:bg-neutral-200 hover:text-gray-800 cursor-pointer"
        aria-label="Github"
        onClick={() => onClick("google")}
      >
        {" "}
        <span className="text-lg font-medium">G</span>
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-[#1e1e26] py-2 text-gray-300 hover:bg-neutral-200 hover:text-gray-800 cursor-pointer"
        aria-label="Github"
        onClick={() => onClick("github")}
      >
        <Github className="h-4 w-4 font-semibold" />
      </Button>
    </div>
  );
};
