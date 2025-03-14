"use client";

import { Button } from "@/components/ui/button";
import { useMenuStore, type FontSize, type FontFamily } from "@/lib/store";
import { cn } from "@/lib/utils";

const fontSizes: { id: FontSize; label: string; class: string }[] = [
  { id: "small", label: "Small", class: "text-base" },
  { id: "medium", label: "Medium", class: "text-lg" },
  { id: "large", label: "Large", class: "text-xl" },
  { id: "xl", label: "Extra Large", class: "text-2xl" },
];

const fontFamilies: { id: FontFamily; label: string; class: string }[] = [
  { id: "mono", label: "Monospace", class: "font-mono" },
  { id: "sans", label: "Sans Serif", class: "font-sans" },
  { id: "serif", label: "Serif", class: "font-serif" },
  { id: "roboto-mono", label: "Roboto Mono", class: "font-['Roboto_Mono']" },
];

export default function Settings() {
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useMenuStore();

  return (
    <main className="min-h-[calc(100vh-84px)] bg-primary p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Font Size Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-zinc-400">font size</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fontSizes.map((size) => (
              <Button
                key={size.id}
                variant="ghost"
                className={cn(
                  "h-8 bg-zinc-800 text-white",
                  fontSize === size.id && "bg-neutral-200 text-black"
                )}
                onClick={() => setFontSize(size.id)}
              >
                <span className="">{size.label}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Font Family Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-zinc-400">font family</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fontFamilies.map((font) => (
              <Button
                key={font.id}
                variant="ghost"
                className={cn(
                  "h-8 bg-zinc-800 text-white",
                  fontFamily === font.id && "bg-neutral-200 text-black"
                )}
                onClick={() => setFontFamily(font.id)}
              >
                {font.label}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
