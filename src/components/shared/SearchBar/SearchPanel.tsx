"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";
import MatchedResult from "./MatchedResult";

const SearchPanel = () => {
  const searchParams = useSearchParams();
  const globalQuery = searchParams.get("global");
  const typeQuery = searchParams.get("type");

  const [results, setResults] = React.useState([]);
  console.log({ results });
  React.useEffect(() => {
    const fetchResults = async () => {
      const res = await globalSearch({
        searchQuery: globalQuery,
        type: typeQuery,
      });
      setResults(res as never[]);
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
        return `/review/${id}`;
    }
  };

  return (
    <div className="primary-font-color-pureWhite-pureBlack absolute inset-x-0 top-12 z-10 bg-dark-darker-greyish-blue">
      <GlobalFilters />
      <div className="my-5 h-px bg-white/50 dark:bg-gray-50/50" />
      {results.map((item: any) => {
        const link = renderLink(item.type, item.id);
        return (
          <MatchedResult
            key={item}
            hrefLink={link!}
            title={item.title}
            type={item.type}
          />
        );
      })}
    </div>
  );
};

export default SearchPanel;
