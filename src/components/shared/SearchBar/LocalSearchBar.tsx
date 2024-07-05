"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formUrlPath, deleteUrlPath } from "@/lib/utils";

const LocalSearchBar = ({
  placeHolder,
  route,
}: {
  placeHolder: string;
  route: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [searchResult, setSearchResult] = React.useState(query || "");
  React.useEffect(() => {
    const timeoutEvent = setTimeout(() => {
      if (searchResult) {
        // Form the Url (create or update its search params as the user types in the input)
        const urlPath = formUrlPath({
          entireSearchParams: searchParams.toString(),
          key: "q",
          value: searchResult,
        });
        router.push(urlPath, { scroll: false });
      } else {
        if (pathname === route) {
          // Delete the Url's search params
          const urlPath = deleteUrlPath({
            entireSearchParams: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(urlPath, { scroll: false });
        }
      }
    }, 250);
    return () => clearTimeout(timeoutEvent);
  }, [pathname, route, router, searchParams, searchResult]);
  return (
    <div className="flex w-full max-w-full items-center gap-x-4">
      <div className="max-h-6 w-6 max-w-full sm:max-h-8 sm:w-8">
        <Image
          className="object-contain"
          src={"/assets/icon-search.svg"}
          alt="Search Icon"
          width={24}
          height={24}
          layout="responsive"
        />
      </div>
      <Input
        type="text"
        className="no-focus primary-font-color-pureWhite-pureBlack border-none shadow-none outline-none focus:border-b focus:border-b-white"
        placeholder={placeHolder}
        value={searchResult}
        onChange={(e) => setSearchResult(e.target.value)}
      />
    </div>
  );
};

export default LocalSearchBar;
