import React from "react";
import BookmarkedState from "../BookmarkedState/BookmarkedState";
import Image from "next/image";
import { ISeriesType } from "@/database/series.model";
import ItemThumbnail from "./ItemThumbnail";
import Link from "next/link";
import { checkSeriesBookmarked } from "@/lib/actions/series.action";

const SeriesItem = async ({
  document,
  isTrending = false,
  userId,
}: {
  document: ISeriesType;
  isTrending?: boolean;
  userId: string;
}) => {
  const bookmarkedStatus = await checkSeriesBookmarked({
    userId,
    currentSeriesId: document._id as string,
  });
  const imageSrc =
    document.category === "Movie"
      ? "/assets/icon-nav-movies.svg"
      : "/assets/icon-nav-tv-series.svg";
  const imageAlt =
    document.category === "Movie" ? "Movie Image" : "TV Series Image";
  const finalizedCategoryImage = (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={12}
      height={12}
      className="size-auto object-contain"
    />
  );
  return (
    <Link
      href={`/series/${document._id}`}
      className="relative max-h-fit w-fit max-w-fit rounded-md"
    >
      <BookmarkedState
        otherClass="absolute right-2 top-2"
        seriesId={document._id as string}
        userId={userId}
        isBookmarked={bookmarkedStatus!}
      />
      {/* Co truong hop series khong phai la trending se khong co image cho trending aka khong co duong dan anh cho thumbnail.trending.small */}
      <ItemThumbnail
        isTrending={isTrending}
        thumbnailLinks={document.thumbnail}
      />

      <div
        className={`bottom-[12px] left-4 ${isTrending ? "absolute pt-0" : "static pt-2"}`}
      >
        <ul
          className={`primary-font-color-pureWhite-pureBlack flex items-center ${isTrending ? "gap-x-2" : "gap-x-1"} ${isTrending ? "text-12" : "text-11"} uppercase `}
        >
          <li className=" text-[#9C9FA7]">{document.year}</li>
          <span className="text-[#9C9FA7]">•</span>
          <li className="flex gap-x-[6px]  font-normal capitalize text-dark-pure-white">
            {finalizedCategoryImage}
            <span className=" text-[#9C9FA7]">{document.category}</span>
          </li>
          <span className="text-[#9C9FA7]">•</span>
          <li className=" text-[#9C9FA7]">{document.rating}</li>
        </ul>
        <h5
          className={`${isTrending ? "text-15" : "text-14"} text-dark-pure-white`}
        >
          {document.title}
        </h5>
      </div>
    </Link>
  );
};

export default SeriesItem;
