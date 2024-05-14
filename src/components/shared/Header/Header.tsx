/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import NavBar from "../NavBar/NavBar";
import MobileNavBar from "../NavBar/MobileNavBar";
import ThemeToggle from "../Theme/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed-content flex-between form-background-semiLightBlue-semiDarkBlue fixed-tablet-header fixed-desktop-header mb-8 min-h-[72px] rounded-[10px] px-4 py-3 lg:flex lg:min-h-[960px] lg:w-24 lg:flex-col lg:justify-start lg:px-8 lg:py-9">
      <div className="lg:mb-20">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={25}
          height={20}
          className="lg:hidden"
        />
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={32}
          height={25}
          className="hidden lg:block"
        />
      </div>
      <NavBar />
      <div className="hidden sm:flex sm:items-center sm:gap-6 lg:mt-auto lg:flex lg:flex-col">
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="hidden rounded-lg bg-primary-red px-3 py-1 text-white sm:inline-block">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
      <MobileNavBar />
    </header>
  );
};

export default Header;
