import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${poppins.className} bg-white/5`}>
        <main className="min-h-screen">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
