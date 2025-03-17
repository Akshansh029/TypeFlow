import type { Metadata } from "next";
import {
  Poppins,
  JetBrains_Mono,
  Fira_Code,
  Source_Code_Pro,
  Ubuntu_Mono,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { cn } from "../lib/utils";
import { Toaster } from "sonner";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ubuntu",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description:
    "Test and improve your typing speed with our free typing test website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        jetbrainsMono.variable,
        firaCode.variable,
        sourceCodePro.variable,
        ubuntuMono.variable,
        robotoMono.variable
      )}
    >
      <body className={`${poppins.className} bg-white/5`}>
        <SessionProviderWrapper>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
