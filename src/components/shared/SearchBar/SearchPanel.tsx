"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import GlobalFilters from "./GlobalFilters";
import { globalSearch2 } from "@/lib/actions/general.action";
import MatchedResult from "./MatchedResult";
import { ReloadIcon } from "@radix-ui/react-icons";

const SearchPanel = () => {
  const searchParams = useSearchParams();
  const globalQuery = searchParams.get("global");
  const typeQuery = searchParams.get("type");
  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const res = await globalSearch2({
          searchQuery: globalQuery,
          type: typeQuery,
        });
        setResults(res as never[]);
      } catch (err: unknown) {
        if (err instanceof Error) console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (globalQuery) fetchResults();
  }, [globalQuery, typeQuery]);

  const renderLink = (key: string, id: string) => {
    switch (key) {
      case "series":
        return `/series/${id}`;
      case "user":
        return `/account/${id}`;
      case "review":
        return `/series/${id}`;
    }
  };

  return (
    <div className="primary-font-color-pureWhite-pureBlack absolute inset-x-0 top-12 z-10 bg-dark-darker-greyish-blue">
      <GlobalFilters />
      <div className="my-5 h-px bg-white/50 dark:bg-gray-50/50" />
      {isLoading && (
        <div className="mt-7 flex w-full max-w-full items-center justify-center">
          <ReloadIcon className="size-10 animate-spin" />
        </div>
      )}
      {results.length > 0 ? (
        results.map((item: any, index: number) => {
          const link = renderLink(item.type, item.id);
          return (
            <MatchedResult
              key={`${item.type}-${item.title}-${index}`}
              hrefLink={link!}
              title={item.title}
              type={item.type}
            />
          );
        })
      ) : (
        <p>There is no matched results. Please try again!</p>
      )}
    </div>
  );
};

export default SearchPanel;
