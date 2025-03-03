"use client";

export default function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="text-3xl font-bold tracking-tighter">
        <span className="text-green-400">Type</span>
        <span className="text-neutral-200">Test</span>
        <span className="inline-block w-[3px] h-6 bg-green-400 ml-1 animate-pulse" />
      </h1>
    </div>
  );
}
