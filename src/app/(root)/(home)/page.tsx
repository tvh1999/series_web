/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { findUserByClerkId } from "@/lib/actions/users.action";
import GlobalSearchBar from "@/components/shared/SearchBar/GlobalSearchBar";
import TrendingCarousel from "@/components/shared/TrendingCarousel/TrendingCarousel";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import { getSeriesFromDB } from "@/lib/actions/series.action";

const HomePage = async () => {
  const { userId: clerkId } = auth();
  // const userId = "1234567890";
  let mongoUser;
  if (clerkId) {
    mongoUser = await findUserByClerkId({ clerkId });
  }
  const getRecommendations = await getSeriesFromDB({});
  return (
    <div className="sm:px-4 md:px-0">
      <GlobalSearchBar />
      <TrendingCarousel />
      <SeriesList data={getRecommendations!} userId={mongoUser?._id} />
    </div>
  );
};

export default HomePage;
