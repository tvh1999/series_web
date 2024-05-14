import React from "react";
import Image from "next/image";

const BookmarkedState = ({ isBookmarked }: { isBookmarked: boolean }) => {
  return (
    <div>
      {isBookmarked ? (
        <Image
          src="/assets/icon-bookmark-full.svg"
          alt="Bookmark"
          width={12}
          height={14}
          className="absolute right-4 top-4"
        />
      ) : (
        <Image
          src="/assets/icon-bookmark-empty.svg"
          alt="Bookmark"
          width={12}
          height={14}
          className="absolute right-4 top-4"
        />
      )}
    </div>
  );
};

export default BookmarkedState;
