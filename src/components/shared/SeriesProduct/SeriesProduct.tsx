import React from "react";
import Image from "next/image";
import BookmarkedState from "../BookmarkedState/BookmarkedState";

const SeriesProduct = ({
  imageSrc,
  productName,
  productionYear,
  category,
  rating,
  isBookmarked,
}: {
  imageSrc: string;
  productName: string;
  productionYear: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
}) => {
  const categoryIconRendered =
    category === "Movie" ? (
      <Image
        src="/assets/icons/icon-nav-movies.svg"
        alt="Movie"
        width={12}
        height={12}
      />
    ) : (
      <Image
        src="/assets/icons/icon-nav-tv-series.svg"
        alt="TV Series"
        width={12}
        height={12}
      />
    );
  return (
    <li>
      <Image
        src={imageSrc}
        alt={productName}
        width={220}
        height={140}
        className="relative"
      />
      <BookmarkedState isBookmarked={isBookmarked} />
      <div>
        <div className="flex justify-between gap-y-[18px] text-16">
          <p>{category}</p>・{categoryIconRendered}・<p>{rating}</p>
        </div>
      </div>
      <h4 className="text-24">{productName}</h4>
    </li>
  );
};

export default SeriesProduct;
