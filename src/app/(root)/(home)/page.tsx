/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { findUserById } from "@/lib/actions/users.action";
import GlobalSearchBar from "@/components/shared/SearchBar/GlobalSearchBar";
import TrendingCarousel from "@/components/shared/TrendingCarousel/TrendingCarousel";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

const HomePage = async () => {
  // const { userId } = auth();
  const userId = "1234567890";
  const clerkUserId = await findUserById(userId);
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
