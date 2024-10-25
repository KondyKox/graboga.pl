"use client";

import Link from "next/link";
import React from "react";
import { FaPlay, FaStore, FaBox, FaUser } from "react-icons/fa";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  // Render nav links with icons
  const renderLinks = () => {
    return (
      <>
        <Link href={"/inventory"}>
          <FaBox className="icon" />
        </Link>
        <Link href={"/play"}>
          <FaPlay className="icon" />
        </Link>
        <Link href={"/store"}>
          <FaStore className="icon" />
        </Link>
      </>
    );
  };

  return (
    <nav
      className="bg-background fixed bottom-0 md:relative md:top-0 w-full flex justify-between items-center p-4 
                    border-t-2 sm:border-t-0 md:border-b-2 z-10"
    >
      <div className="hidden md:flex justify-between items-center mx-2 w-full">
        <div>
          <Logo />
        </div>
        <div className="flex justify-center items-center gap-x-16">
          {renderLinks()}
        </div>
        <div className="flex justify-center items-center">
          <Link href={"/user"}>
            <FaUser className="icon" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden w-full justify-center items-center">
        <div className="flex justify-center items-center gap-x-8">
          <Logo />
          {renderLinks()}
          <Link href={"/user"}>
            <FaUser className="icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
