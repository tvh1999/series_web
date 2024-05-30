/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavItem = ({
  href,
  src,
  alt,
  isActive,
}: {
  href: string;
  src: string;
  alt: string;
  isActive: boolean;
}) => {
  return (
    <li
      className={`text-30 mt-4 px-3 py-2 font-bold md:mt-0 md:p-0 ${isActive ? "border border-primary-red" : ""}`}
    >
      <Link
        href={href}
        className="flex items-center justify-start gap-2 md:gap-8"
      >
        <Image
          className={`object-contain ${isActive ? "border fill-primary-red" : ""} md:hidden`}
          src={src}
          alt={alt}
          width={14}
          height={14}
        />
        <Image
          className={`hidden object-contain ${isActive ? "border fill-primary-red" : ""} md:inline-block`}
          src={src}
          alt={alt}
          width={20}
          height={20}
        />
        <h5 className=" text-black sm:hidden ">{alt}</h5>
      </Link>
    </li>
  );
};
// filter: invert(30%) sepia(91%) saturate(1837%) hue-rotate(340deg) brightness(113%) contrast(97%);
export default NavItem;
