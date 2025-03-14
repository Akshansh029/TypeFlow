import { Construction } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-84px)] bg-primary p-8 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Construction className="w-15 h-15 text-zinc-200" />

        <h2 className="text-2xl text-zinc-200 font-bold">
          Developing requested page...
        </h2>
        <p className="text-zinc-400">
          This page is currently under development. Please check back soon.
        </p>
        <Link href="/" className="text-zinc-400">
          Return Home
        </Link>
      </div>
    </main>
  );
}
