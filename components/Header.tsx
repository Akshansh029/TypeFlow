import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

interface HeaderProps {
  heading: string;
  label: string;
  icon?: React.ElementType;
}

export const Header = ({ heading, label, icon: Icon }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4 justify-center text-gray-300">
      <div className="flex items-center gap-x-2">
        {Icon && <Icon className="w-6 h-6 text-gray-300" />}
        <h1 className={cn("text-3xl font-semibold", poppins.className)}>
          {heading}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
