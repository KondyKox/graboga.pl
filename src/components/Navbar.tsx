"use client";

import Link from "next/link";
import React from "react";
import { FaPlay, FaStore, FaBox, FaUser } from "react-icons/fa";
import Logo from "./Logo";
import Tooltip from "./Tooltip";

const Navbar: React.FC = () => {
  // Render nav links with icons
  const renderLinks = () => {
    return (
      <>
        <Link href={"/inventory"} className="relative group flex flex-col items-center">
          <FaBox className="icon" />
          <Tooltip>Ekwipunek</Tooltip>
        </Link>
        <Link href={"/play"} className="relative group flex flex-col items-center">
          <FaPlay className="icon" />
          <Tooltip>Graj</Tooltip>
        </Link>
        <Link href={"/store"} className="relative group flex flex-col items-center">
          <FaStore className="icon" />
          <Tooltip>Sklep</Tooltip>
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
          <Link href={"/user"} className="relative group flex flex-col items-center">
            <FaUser className="icon" />
            <Tooltip>Konto</Tooltip>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden w-full justify-center items-center">
        <div className="flex justify-center items-center gap-x-8">
          <Logo />
          {renderLinks()}
          <Link href={"/user"} className="relative group flex flex-col items-center">
            <FaUser className="icon" />
            <Tooltip>Konto</Tooltip>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
