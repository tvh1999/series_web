"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { userBookmark } from "@/lib/actions/users.action";
// bg-[#606779]

interface Props {
  userId: string;
  seriesId: string;
  isBookmarked: boolean;
  otherClass?: string;
}
const BookmarkedState = ({
  userId,
  seriesId,
  isBookmarked,
  otherClass,
}: Props) => {
  const [bookmarkedIconState, setBookmarkedIconState] =
    React.useState(isBookmarked);
  const path = usePathname();
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
      className={`flex-center min-h-8 w-8 max-w-full rounded-full bg-[#606779]/50 ${otherClass} hover:cursor-pointer`}
      onClick={(e) => {
        if (e.defaultPrevented) return;
        e.preventDefault();

        setBookmarkedIconState(!bookmarkedIconState);
        userBookmark({ path, userId, seriesId });
      }}
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
