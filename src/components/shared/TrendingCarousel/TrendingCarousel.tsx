import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getSeriesFromDB } from "@/lib/actions/series.action";
import { ISeriesType } from "@/database/series.model";
import SeriesListWrapper from "../Wrapper/SeriesListWrapper";
import SeriesItem from "../SeriesItem/SeriesItem";
import { auth } from "@clerk/nextjs/server";
import { findUserByClerkId } from "@/lib/actions/users.action";

const TrendingCarousel = async () => {
  const { userId: clerkId } = auth();
  let currentUserId = "";
  if (clerkId) {
    currentUserId = await findUserByClerkId({ clerkId: clerkId! });
  }
  const trendingDocuments = await getSeriesFromDB({ isTrending: true });
  return (
    <SeriesListWrapper heading="Trending">
      <Carousel>
        <CarouselContent>
          {trendingDocuments?.map((document: ISeriesType) => (
            <CarouselItem key={document._id as string} className="basis-auto">
              <SeriesItem
                document={document}
                isTrending={true}
                userId={currentUserId}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </SeriesListWrapper>
  );
};

export default TrendingCarousel;
