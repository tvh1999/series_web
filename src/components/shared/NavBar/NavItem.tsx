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
  isActive?: boolean;
}) => {
  return (
    <li
      className={`text-30 mt-4 px-3 py-2 font-bold ${isActive ? "border-primary-red rounded-xl border" : ""}`}
    >
      <Link href={href} className="flex items-center justify-start gap-2">
        <Image
          className="text-primary-red fill-current"
          src={src}
          alt={alt}
          width={14}
          height={14}
        />
        <h5 className="sm:hidden">{alt}</h5>
      </Link>
    </li>
  );
};
// filter: invert(30%) sepia(91%) saturate(1837%) hue-rotate(340deg) brightness(113%) contrast(97%);
export default NavItem;
