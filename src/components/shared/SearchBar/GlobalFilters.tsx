"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlPath, deleteUrlPath } from "@/lib/utils";

const FILTER_ITEMS = [
  { value: "series", name: "series" },
  { value: "user", name: "user" },
  { value: "review", name: "review" },
];

const GlobalFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = React.useState("");

  const clickHandler = (type: string) => {
    let urlPath = "";
    if (active === type) {
      setActive("");
      urlPath = deleteUrlPath({
        entireSearchParams: searchParams.toString(),
        keysToRemove: ["type"],
      });
    } else {
      setActive(type);
      urlPath = formUrlPath({
        entireSearchParams: searchParams.toString(),
        key: "type",
        value: type,
      });
    }

    router.push(urlPath);
  };
  return (
    <div className="flex items-center gap-x-4">
      <h6 className="primary-font-color-pureWhite-pureBlack">Filter:</h6>
      {FILTER_ITEMS.map((item) => (
        <div
          key={item.value}
          className="primary-font-color-pureWhite-pureBlack rounded-2xl border border-white px-3 py-1"
          onClick={() => clickHandler(item.value)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default GlobalFilters;
