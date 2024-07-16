import React from "react";
import Image from "next/image";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center background-lightWhite-darkBlue min-h-screen w-full max-w-full flex-col pb-44">
      <Link href={"/"}>
        <Image
          className="mb-14 mt-12 size-auto"
          src={"/assets/logo.svg"}
          alt="Logo"
          width={40}
          height={40}
        />
      </Link>
      {children}
    </main>
  );
};

export default layout;
