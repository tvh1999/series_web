import React from "react";
import LocalSearchBar from "@/components/shared/SearchBar/LocalSearchBar";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

const SeriesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const getSeriesBasedOnCategoryPage = await getSeriesFromDB({
    searchQuery: searchParams.q,
    category: "TV Series",
  });
  return (
    <div>
      <LocalSearchBar
        placeHolder={"Search for TV Series..."}
        route="/tv-series"
      />
      <SeriesList data={getSeriesBasedOnCategoryPage!} heading="TV Series" />
    </div>
  );
};

export default SeriesPage;
