"use client";
import React from "react";
import Image from "next/image";
// bg-[#606779]
const BookmarkedState = ({ className }: { className?: string }) => {
  const [bookmarkedIconState, setBookmarkedIconState] = React.useState(false);
  const bookkmarkedIconSrc =
    bookmarkedIconState === true
      ? "/assets/icon-bookmark-full.svg"
      : "/assets/icon-bookmark-empty.svg";
  const bookkmarkedIconAlt =
    bookmarkedIconState === true
      ? "Series bookmakred"
      : "Series is not bookmakred";
  return (
    <div
      className={`flex-center min-h-8 w-8 max-w-full rounded-full bg-[#606779]/50 ${className} hover:cursor-pointer`}
      onClick={() => setBookmarkedIconState(!bookmarkedIconState)}
    >
      <Image
        src={bookkmarkedIconSrc}
        width={11.7}
        height={14}
        alt={bookkmarkedIconAlt}
      />
    </div>
  );
};

export default BookmarkedState;
