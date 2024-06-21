import React from "react";
import {
  findUserByClerkId,
  getUserSavedSeriesById,
} from "@/lib/actions/users.action";
import { auth } from "@clerk/nextjs/server";
import SeriesList from "@/components/shared/SeriesList/SeriesList";
import LocalSearchBar from "@/components/shared/SearchBar/LocalSearchBar";

const BookmarkedCollectionPage = async () => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await findUserByClerkId({ clerkId });
  }
  const seriesData = await getUserSavedSeriesById({
    clerkId: mongoUser.clerkId!,
  });
  const moviesList = seriesData.filter(
    (value: any) => value.category === "Movie"
  );
  const seriesList = seriesData.filter(
    (value: any) => value.category !== "Movie"
  );
  return (
    <div>
      <LocalSearchBar placeHolder={"Search for bookmarked shows"} />
      {moviesList?.length < 1 ? (
        "No movies can be found"
      ) : (
        <SeriesList
          data={moviesList}
          heading="Bookmarked Movies"
          otherClasses="mb-10"
        />
      )}

      {seriesList?.length < 1 ? (
        "No series can be found"
      ) : (
        <SeriesList data={seriesList} heading="Bookmarked TV Series" />
      )}
    </div>
  );
};

export default BookmarkedCollectionPage;
