"use client";

import { Button } from "./ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full inline-flex hover:underline text-gray-300"
      size="sm"
      asChild
    >
      <Link href={href}>
        <span className="underline text-gray-300">{label}</span>
      </Link>
    </Button>
  );
};
