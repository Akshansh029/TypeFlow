import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-84px)] flex items-center justify-center bg-primary">
      {children}
    </div>
  );
};

export default AuthLayout;
