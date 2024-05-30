import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const LocalSearchBar = ({ placeHolder }: { placeHolder: string }) => {
  return (
    <div className="flex w-full max-w-full items-center gap-x-4">
      <Image
        className="object-contain sm:hidden"
        src={"/assets/icon-search.svg"}
        alt="Search Icon"
        width={24}
        height={24}
      />
      <Image
        className="hidden object-contain sm:inline-block"
        src={"/assets/icon-search.svg"}
        alt="Search Icon"
        width={32}
        height={32}
      />
      <Input
        type="text"
        className="no-focus primary-font-color-pureWhite-pureBlack border-none shadow-none outline-none focus:border-b focus:border-b-white"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default LocalSearchBar;
