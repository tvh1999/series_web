import React from "react";
import { NAVIGATION_ITEMS } from "@/constants";
import NavItem from "./NavItem";
const NavBar = () => {
  return (
    <ul className="sm:flex-between hidden gap-6">
      {NAVIGATION_ITEMS.map((item) => (
        <NavItem key={item.id} href={item.href} src={item.src} alt={item.alt} />
      ))}
    </ul>
  );
};

export default NavBar;
