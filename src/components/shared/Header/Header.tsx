/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import NavBar from "../NavBar/NavBar";
import MobileNavBar from "../NavBar/MobileNavBar";
import ThemeToggle from "../Theme/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed-content flex-between form-background-semiLightBlue-semiDarkBlue px-4 py-3">
      <Image src="/assets/logo.svg" alt="Logo" width={25} height={20} />
      <NavBar />
      <div className="hidden sm:flex sm:items-center sm:gap-6">
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="bg-primary-red hidden rounded-lg px-3 py-1 text-white sm:inline-block">
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
