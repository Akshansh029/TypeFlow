"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Github, LucideLogIn, LucideUserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(() => {
      //   const error =
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-primary p-4 text-gray-300 md:flex-row md:gap-32 min-h-[calc(100vh-84px)]">
      <div className="flex w-full max-w-2xl md:items-start md:gap-32">
        {/* Register Form */}
        <div className="flex-1 min-h-[400px] self-start">
          <div className="mb-6 flex items-center gap-2">
            <LucideUserPlus className="h-5 w-5" />
            <h2 className="text-xl font-light">register</h2>
          </div>
          <form className="space-y-3">
            <Input
              type="text"
              placeholder="username"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="email"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="verify email"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <Input
              type="password"
              placeholder="password"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <Input
              type="password"
              placeholder="verify password"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <Button
              type="submit"
              className="w-full bg-[#1e1e26] py-2 hover:bg-[#2a2a36]"
            >
              <LucideUserPlus className="mr-2 h-4 w-4" />
              sign up
            </Button>
          </form>
        </div>

        {/* Login Form */}
        <div className="flex-1 min-h-[400px] self-start">
          <div className="mb-6 flex items-center gap-2">
            <LucideLogIn className="h-5 w-5" />
            <h2 className="text-xl font-light">login</h2>
          </div>
          <div className="mb-4 flex gap-4">
            <Button
              variant="outline"
              className="flex-1 bg-[#1e1e26] py-2 text-gray-300 hover:bg-[#2a2a36]"
            >
              <span className="text-lg font-medium">G</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-[#1e1e26] py-2 text-gray-300 hover:bg-[#2a2a36]"
            >
              <Github />
            </Button>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>
          <form className="space-y-4">
            <Input
              type="email"
              placeholder="email"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <Input
              type="password"
              placeholder="password"
              className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-gray-600 data-[state=checked]:bg-gray-600"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                remember me
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1e1e26] py-2 hover:bg-[#2a2a36]"
            >
              <LucideLogIn className="mr-2 h-4 w-4" />
              sign in
            </Button>
          </form>
          <div className="mt-4 text-right">
            <Link
              href="/forgot-password"
              className="text-sm !text-gray-500 !hover:text-gray-700"
            >
              forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
