"use client";

import { BackButton } from "./BackButton";
import { Header } from "./Header";
import { Socials } from "./Socials";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  heading: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  icon?: React.ElementType;
}

export const CardWrapper = ({
  children,
  heading,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  icon,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-xl shadow-gray-900 bg-transparent border border-gray-700 rounded-xl">
      <CardHeader>
        <Header icon={icon} heading={heading} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
