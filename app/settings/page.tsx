"use client";

import { Button } from "@/components/ui/button";
import { useMenuStore, type FontSize, type FontFamily } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  JetBrains_Mono,
  Fira_Code,
  Source_Code_Pro,
  Ubuntu_Mono,
} from "next/font/google";

const fontSizes: { id: FontSize; label: string; class: string }[] = [
  { id: "small", label: "Small", class: "text-xl" },
  { id: "medium", label: "Medium", class: "text-2xl" },
  { id: "large", label: "Large", class: "text-3xl" },
  { id: "xl", label: "Extra Large", class: "text-4xl" },
];

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
const ubuntuMono = Ubuntu_Mono({ subsets: ["latin"], weight: "400" });

const fontFamilies: { id: FontFamily; label: string; class: string }[] = [
  { id: "mono", label: "System Mono", class: "font-mono" },
  { id: "jetbrains-mono", label: "JetBrains", class: jetbrainsMono.className },
  { id: "fira-code", label: "Fira Code", class: firaCode.className },
  {
    id: "source-code-pro",
    label: "Source Code",
    class: sourceCodePro.className,
  },
  { id: "ubuntu-mono", label: "Ubuntu Mono", class: ubuntuMono.className },
  { id: "sans", label: "System Sans", class: "font-sans" },
  { id: "serif", label: "System Serif", class: "font-serif" },
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

        {/* Preview Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-zinc-400">preview</h2>
          <div className="p-6 bg-zinc-800/50 rounded-lg">
            <p
              className={cn(
                "text-white",
                fontFamilies.find((f) => f.id === fontFamily)?.class,
                fontSizes.find((s) => s.id === fontSize)?.class
              )}
            >
              The quick brown fox jumps over the lazy dog 1234567890
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
