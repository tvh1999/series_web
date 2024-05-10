/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center background-lightWhite-darkBlue min-h-screen w-full max-w-full flex-col pb-44">
      <Image
        className="mb-14 mt-12"
        src={"/assets/logo.svg"}
        alt="Logo"
        width={40}
        height={40}
      />
      {children}
    </main>
  );
};

export default layout;
