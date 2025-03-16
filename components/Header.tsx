import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4 justify-center">
      <h1 className={cn("text-3xl font-semibold", poppins.className)}>
        Auth 🔐
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
