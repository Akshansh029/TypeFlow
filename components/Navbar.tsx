"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Keyboard, Crown, Info, Settings, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Keyboard, color: "#f94348" },
  { href: "/leaderboard", label: "Leaderboard", icon: Crown, color: "#9261ff" },
  { href: "/about", label: "About", icon: Info, color: "#3cc5f8" },
  { href: "/settings", label: "Settings", icon: Settings, color: "#4acb8a" },
  { href: "/profile", label: "Profile", icon: User, color: "#ffd543" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <nav className="w-full bg-primary">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Keyboard className="h-7 w-7 text-accent-primary transition-colors" />
              <span className="text-2xl font-bold text-accent-primary">
                TypeFlow
              </span>
            </Link>

            <p className="hidden md:block text-sm text-[#e5e5e5]/90 ml-2">
              Test your typing speed and improve your skills
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {NAV_ITEMS.map(({ href, label, icon: Icon, color }) => (
              <Link key={href} href={href}>
                <Button
                  variant="ghost"
                  size="icon"
                  title={label}
                  aria-label={label}
                  className="w-10 h-10 text-black rounded-full hover:text-white hover:bg-transparent cursor-pointer"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-8 w-8" />
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-7 w-7 text-gray-300 hover:text-black transition-colors" />
            ) : (
              <Menu className="h-7 w-7 text-gray-300 hover:text-black transition-colors" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`transition-all duration-200 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:hidden`}
        >
          <div className="pt-4 pb-2 space-y-2">
            <p className="text-sm text-[#e5e5e5]/90 mb-4">
              Test your typing speed and improve your skills
            </p>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 py-2 px-3"
              >
                <Icon className="h-8 w-8 text-gray-300 transition-colors" />
                <span className="text-zinc-300">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
