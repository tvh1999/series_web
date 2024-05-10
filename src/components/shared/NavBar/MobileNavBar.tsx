"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { NAVIGATION_ITEMS } from "@/constants";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

const MobileNavBar = () => {
  const pathname = usePathname();
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-white">
          <SheetClose asChild>
            <ul>
              {NAVIGATION_ITEMS.map((item, index: number) => {
                const isActive =
                  (pathname.includes(item.href) && item.href.length > 1) ||
                  pathname === item.href;
                return (
                  <NavItem
                    isActive={isActive}
                    key={`${item.id}-${index}`}
                    href={item.href}
                    src={item.src}
                    alt={item.alt}
                  />
                );
              })}
            </ul>
          </SheetClose>
          <SheetClose asChild>
            <div className="mt-5 flex">
              <SignInButton>
                <button className="rounded-xl px-5 py-3">Sign In</button>
              </SignInButton>
              <SignUpButton>
                <button className="rounded-xl px-5 py-3">Sign Up</button>
              </SignUpButton>
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavBar;
