import React from "react";
import Header from "@/components/shared/Header/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="gap-x-8 lg:grid lg:grid-cols-[96px,1fr]">
      <div>
        <Header />
      </div>
      <main className="mt-[88px] w-full max-w-full lg:mt-0">{children}</main>
    </div>
  );
};

export default layout;
