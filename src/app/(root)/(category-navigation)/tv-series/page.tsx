import React from "react";
import LocalSearchBar from "@/components/shared/SearchBar/LocalSearchBar";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

const SeriesPage = async () => {
  const getSeriesBasedOnCategoryPage = await getSeriesFromDB({
    category: "TV Series",
  });
  return (
    <div>
      <LocalSearchBar placeHolder={"Search for TV Series..."} />
      <SeriesList data={getSeriesBasedOnCategoryPage!} heading="TV Series" />
    </div>
  );
};

export default SeriesPage;
