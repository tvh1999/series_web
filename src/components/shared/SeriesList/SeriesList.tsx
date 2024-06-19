import React from "react";
import SeriesListWrapper from "../Wrapper/SeriesListWrapper";
import { ISeriesType } from "@/database/series.model";
import SeriesItem from "../SeriesItem/SeriesItem";
import { findUserByClerkId } from "@/lib/actions/users.action";
import { auth } from "@clerk/nextjs/server";

const SeriesList = async ({ data }: { data: ISeriesType[] }) => {
  const { userId: clerkId } = auth();
  // const userId = "1234567890";
  let mongoUser: string | undefined;
  if (clerkId) {
    mongoUser = await findUserByClerkId({ clerkId });
  }
  return (
    <SeriesListWrapper
      heading="Recommended for you"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4"
    >
      {data?.map((document) => (
        <SeriesItem
          key={document._id}
          document={document!}
          userId={mongoUser!}
        />
      ))}
    </SeriesListWrapper>
  );
};

export default SeriesList;
