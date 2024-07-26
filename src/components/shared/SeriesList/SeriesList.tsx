import React from "react";
import SeriesListWrapper from "../Wrapper/SeriesListWrapper";
import { ISeriesType } from "@/database/series.model";
import SeriesItem from "../SeriesItem/SeriesItem";
import { findUserByClerkId } from "@/lib/actions/users.action";
import { auth } from "@clerk/nextjs/server";

const SeriesList = async ({
  data,
  heading,
  otherClasses,
}: {
  data: ISeriesType[];
  heading?: string;
  otherClasses?: string;
}) => {
  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await findUserByClerkId({ clerkId });
  }
  return (
    <SeriesListWrapper
      heading={heading}
      className={`grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4 ${otherClasses}`}
    >
      {data?.map((document) => (
        <SeriesItem
          key={document._id as string}
          document={document!}
          userId={mongoUser?._id}
        />
      ))}
    </SeriesListWrapper>
  );
};

export default SeriesList;
