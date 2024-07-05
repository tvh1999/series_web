import React from "react";
import LocalSearchBar from "@/components/shared/SearchBar/LocalSearchBar";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

interface MoviePageProps {
  searchParams: { [key: string]: string | undefined };
}

const MoviePage = async ({ searchParams }: MoviePageProps) => {
  const getMoviesBasedOnCategoryPage = await getSeriesFromDB({
    searchQuery: searchParams.q,
    category: "Movie",
  });
  // console.log({ getMoviesBasedOnCategoryPage });
  return (
    <>
      <LocalSearchBar placeHolder={"Search for Movie..."} route="/movie" />
      <SeriesList data={getMoviesBasedOnCategoryPage!} />
    </>
  );
};

export default MoviePage;
