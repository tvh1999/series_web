/* eslint-disable no-unused-vars */
import React from "react";
import GlobalSearchBar from "@/components/shared/SearchBar/GlobalSearchBar";
import TrendingCarousel from "@/components/shared/TrendingCarousel/TrendingCarousel";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

const HomePage = async () => {
  const getRecommendations = await getSeriesFromDB({});
  return (
    <div className="sm:px-4 md:px-0">
      <GlobalSearchBar />
      <TrendingCarousel />
      <SeriesList data={getRecommendations!} />
    </div>
  );
};

export default HomePage;
