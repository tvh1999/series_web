import React from "react";
import Header from "@/components/shared/Header/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid-cols-1 gap-x-8 lg:grid lg:grid-cols-[96px,1fr]">
      <Header />
      <main className="mt-[88px] w-full max-w-full lg:mt-0">{children}</main>
    </div>
  );
};

export default layout;
