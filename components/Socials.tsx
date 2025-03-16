"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
export const Socials = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button variant="outline" size="lg" className="flex-1">
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="lg" className="flex-1">
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
