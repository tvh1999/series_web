import React from "react";
import Image from "next/image";

interface IItemThumbnailProps {
  trending: { small: string; large: string };
  regular: { small: string; medium: string; large: string };
}

const ItemThumbnail = ({
  isTrending,
  thumbnailLinks,
}: {
  isTrending: boolean;
  thumbnailLinks: IItemThumbnailProps;
}) => {
  return isTrending ? (
    <>
      <Image
        src={thumbnailLinks.trending?.small}
        alt="Trending Image"
        width={240}
        height={140}
        className="rounded-md object-cover sm:hidden"
      />
      <Image
        src={thumbnailLinks.trending?.large}
        alt="Trending Image"
        width={470}
        height={230}
        className="hidden rounded-md object-cover sm:block"
      />
    </>
  ) : (
    <>
      <Image
        src={thumbnailLinks.regular?.small}
        alt="recommended series"
        width={164}
        height={110}
        className="rounded-md object-cover sm:hidden"
      />
      <Image
        src={thumbnailLinks.regular?.medium}
        alt="recommended series"
        width={220}
        height={140}
        className="hidden rounded-md object-cover md:block lg:hidden"
      />
      <Image
        src={thumbnailLinks.regular?.large}
        alt="recommended series"
        width={280}
        height={174}
        className="hidden rounded-md object-cover lg:block"
      />
    </>
  );
};

export default ItemThumbnail;
