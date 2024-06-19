import React from "react";
import {
  // findUserByClerkId,
  getUserSavedSeriesById,
} from "@/lib/actions/users.action";
import { auth } from "@clerk/nextjs/server";

const BookmarkedCollectionPage = async () => {
  const { userId: clerkId } = auth();
  // const userId = "1234567890";
  // let mongoUser;
  // if (clerkId) {
  //   mongoUser = await findUserByClerkId({ clerkId });
  // }
  const seriesList = await getUserSavedSeriesById({
    clerkId: clerkId!,
  });
  console.log({ series: seriesList! });
  return (
    <>
      {seriesList?.length < 1 ? (
        "No series found"
      ) : (
        <ul>
          {seriesList?.map((series: any) => (
            <li key={series._id}>
              <h4>{series.title}</h4>
              <p>{series.year}</p>
              <p>{series.category}</p>
              <p>{series.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BookmarkedCollectionPage;
