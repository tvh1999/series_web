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

const TrendingCarousel = async () => {
  const trendingDocuments = await getSeriesFromDB({ isTrending: true });
  return (
    <SeriesListWrapper heading="Trending">
      <Carousel>
        <CarouselContent>
          {trendingDocuments?.map((document: ISeriesType) => (
            <CarouselItem key={document._id} className="basis-auto">
              <SeriesItem document={document} isTrending={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </SeriesListWrapper>
  );
};

export default TrendingCarousel;
