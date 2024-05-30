import React from "react";
import SeriesListWrapper from "../Wrapper/SeriesListWrapper";
import { ISeriesType } from "@/database/series.model";
import SeriesItem from "../SeriesItem/SeriesItem";

const SeriesList = ({ data }: { data: ISeriesType[] }) => {
  return (
    <SeriesListWrapper
      heading="Recommended for you"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4"
    >
      {data?.map((document) => (
        <SeriesItem key={document._id} document={document!} />
      ))}
    </SeriesListWrapper>
  );
};

export default SeriesList;
