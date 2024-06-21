import { getSeriesBasedOnItsId } from "@/lib/actions/series.action";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getAllReviews } from "@/lib/actions/reviews.action";
import ReviewCard from "@/components/shared/ReviewCard/ReviewCard";

interface ParamsProps {
  seriesId: string;
}

const SeriesPage = async ({ params }: { params: ParamsProps }) => {
  const getSeries = await getSeriesBasedOnItsId({ seriesId: params.seriesId });
  const getReviews = await getAllReviews({ seriesId: params.seriesId });
  // console.log(getSeries);
  return (
    <>
      <div className="block px-4 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:px-0">
        <div className="h-auto w-full">
          <Image
            src={getSeries.thumbnail.regular.large}
            width={600}
            height={300}
            alt={`${getSeries.title}`}
            className="object-contain"
            layout="responsive"
          />
        </div>
        <div>
          <h3 className="primary-font-color-pureWhite-pureBlack text-36 font-bold">
            {getSeries.title}
          </h3>
          <ul className="primary-font-color-pureWhite-pureBlack flex flex-col gap-y-2 text-20 sm:my-2">
            <li>📅 Year producted: {getSeries.year}</li>
            <li>📚 Category: {getSeries.category}</li>
            <li>🌟 Rating: {getSeries.rating}</li>
            <li className="flex items-center gap-x-3">
              <button>Bookmark</button>
              <Link href={`/review/${params.seriesId}`}>
                <button>Write a review</button>
              </Link>
            </li>
          </ul>
          <p className="primary-font-color-pureWhite-pureBlack text-20 sm:hidden lg:block">
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>
      </div>
      <p className="primary-font-color-pureWhite-pureBlack mt-6 hidden text-20 sm:block lg:hidden">
        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <div className="mt-5 flex flex-col gap-y-4">
        {getReviews.length > 0 ? (
          getReviews.map((review: any) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <p>There are no reviews yet.</p>
        )}
      </div>
    </>
  );
};

export default SeriesPage;
