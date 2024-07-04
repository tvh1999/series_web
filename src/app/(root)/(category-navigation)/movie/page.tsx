import React from "react";
import LocalSearchBar from "@/components/shared/SearchBar/LocalSearchBar";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

const MoviePage = async () => {
  const getMoviesBasedOnCategoryPage = await getSeriesFromDB({
    category: "Movie",
  });
  return (
    <div>
      <LocalSearchBar placeHolder={"Search for Movie..."} route="/movie" />
      <SeriesList data={getMoviesBasedOnCategoryPage!} />
    </div>
  );
};

export default MoviePage;
