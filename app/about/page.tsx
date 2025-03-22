"use client";

import { Github, Linkedin, Code2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const About = () => {
  return (
    <div className="h-[calc(100vh-88px)] bg-primary flex flex-col gap-6 items-center justify-center px-6 md:px-12 ">
      <div className="flex flex-col gap-12 w-full max-w-5xl items-center">
        {/* Creator Info */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            <Image
              src="/avatar.png"
              width={128}
              height={128}
              alt="Akshansh Singh"
              className="rounded-full border-4 border-zinc-300 shadow-lg"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-zinc-200">
              Meet the Creator
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Hi, I&apos;m{" "}
              <span className="font-medium text-zinc-300">Akshansh Singh</span>,
              a passionate developer who loves building elegant and efficient
              web applications.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <Link href="https://github.com/Akshansh029" target="_blank">
              <Button
                variant="secondary"
                className="flex gap-2 text-zinc-800 hover:text-zinc-800 cursor-pointer"
              >
                <Github className="w-5 h-5" /> GitHub
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/akshansh-singh-3b6718250/"
              target="_blank"
            >
              <Button
                variant="secondary"
                className="flex gap-2 text-zinc-800 hover:text-zinc-800 cursor-pointer"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </Button>
            </Link>
            <Link href="https://akshansh-singh.vercel.app/" target="_blank">
              <Button
                variant="secondary"
                className="flex gap-2 text-zinc-800 hover:text-zinc-800 cursor-pointer"
              >
                <Code2 className="w-5 h-5" /> Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contribution Section */}
      <div className="mt-12 text-center flex flex-col items-center space-y-4 max-w-xl">
        <h2 className="text-xl font-semibold text-zinc-200">
          Want to Contribute?
        </h2>
        <p className="text-zinc-400 text-sm">
          This project is open-source, and I’d love to see your contributions!
          Feel free to check out the repository and enhance the platform.
        </p>
        <Link href="https://github.com/Akshansh029/typeflow" target="_blank">
          <Button className="flex gap-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
            View Repository
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
