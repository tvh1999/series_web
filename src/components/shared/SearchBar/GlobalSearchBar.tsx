"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlPath, deleteUrlPath } from "@/lib/utils";
import SearchPanel from "./SearchPanel";

function GlobalSearchBar() {
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState(global || "");
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const pathname = usePathname();
  const panelContainer = React.useRef(null);

  React.useEffect(() => {
    const eventCallback = (event: any) => {
      if (
        panelContainer.current &&
        // @ts-ignore
        !panelContainer.current.contains(event.target)
      ) {
        setInputValue("");
        setIsPanelOpen(false);
      }
    };

    setIsPanelOpen(false);

    document.addEventListener("click", eventCallback);
    return () => document.removeEventListener("click", eventCallback);
  }, [pathname]);

  React.useEffect(() => {
    const debouncedEvent = setTimeout(() => {
      if (inputValue) {
        const newUrl = formUrlPath({
          entireSearchParams: searchParams.toString(),
          key: "global",
          value: inputValue,
        });

        router.push(newUrl, { scroll: false });
      } else if (global) {
        const newUrl = deleteUrlPath({
          entireSearchParams: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 250);

    return () => clearTimeout(debouncedEvent);
  }, [global, inputValue, router, searchParams]);

  return (
    <div
      ref={panelContainer}
      className="relative flex w-full max-w-full cursor-pointer items-center gap-x-6"
    >
      <div className="min-h-6 w-6 max-w-full sm:min-h-8 sm:w-8">
        <Image
          src={"/assets/icon-search.svg"}
          alt="Search Icon"
          width={24}
          height={24}
          className="object-contain"
          layout="responsive"
        />
      </div>
      <Input
        type="text"
        value={inputValue}
        placeholder="Search for movies and TV series..."
        className="no-focus primary-font-color-pureWhite-pureBlack border-none p-0 text-16 shadow-none outline-none focus:border-b focus:border-b-white"
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value === "" && isPanelOpen === true)
            setIsPanelOpen(false);
          else setIsPanelOpen(true);
        }}
      />
      {isPanelOpen && <SearchPanel />}
    </div>
  );
}

export default GlobalSearchBar;
