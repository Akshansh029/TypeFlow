import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center bg-primary h-[calc(100vh-88px)]">
      <div className="w-18 h-18 border-t-transparent border-b-transparent border-r-transparent border-l-zinc-600 rounded-full animate-spin border-4"></div>
    </div>
  );
};

export default loading;
