"use client";
import React from "react";
import { NAVIGATION_ITEMS } from "@/constants";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
const NavBar = () => {
  const { isSignedIn, userId: clerkId } = useAuth();
  const pathName = usePathname();
  return (
    <ul className="sm:flex-between hidden gap-6 md:max-lg:ml-24 lg:flex lg:flex-col lg:gap-y-10">
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = pathName.includes(item.href) && item.href.length > 1;
        if (item.href === "/account" && isSignedIn === true) {
          item.href = `${item.href}/${clerkId}`;
        }
        return (
          <NavItem
            key={item.id}
            href={item.href}
            src={item.src}
            alt={item.alt}
            isActive={isActive}
          />
        );
      })}
    </ul>
  );
};

export default NavBar;
