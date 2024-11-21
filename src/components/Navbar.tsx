"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaPlay, FaStore, FaBox, FaUser } from "react-icons/fa";
import Logo from "./Logo";
import Tooltip from "./Tooltip";
import useUserRole from "@/hooks/useUserRole";
import { FaShield } from "react-icons/fa6";
import useProfile from "@/hooks/useProfile";

const Navbar: React.FC = () => {
  // Render admin dash with icons
  const renderAdmin = () => {
    // get user role
    const { role } = useUserRole();
    //check if admin
    if (role == "admin") {
      return (
        <>
          <Link
            href={"/admin"}
            className="relative group flex flex-col items-center"
          >
            <FaShield className="icon" />
            <Tooltip>Admin</Tooltip>
          </Link>
        </>
      );
    }
    return;
  };

  // Render profile with pfp and name
  const renderProfile = () => {
    // get user profile
    const { error, profile } = useProfile();
    //check no logged
    if (error) {
      return (
        <Link
          href={"/user"}
          className="relative group flex flex-col items-center"
        >
          <FaUser className="icon" />
          <Tooltip>Konto</Tooltip>
        </Link>
      );
    }
    //display profile pfp
    else {
      return (
        <div className="mx-2 md:min-w-32 h-13 p-1 md:border-l-2 border-rare rounded hover:shadow-rare duration-300 ease-in-out">
          <Link href={"/user"} className="relative group">
            <div className="inline w-8 md:w-12 h-8 md:h-12 float-end">
              <Image
                src={profile?.profilePicture || "/donejtor.png"}
                alt="Profile Picture"
                width={64}
                height={64}
                className="h-8 md:h-10 w-8 md:w-10 md:m-1 rounded-full border-2 border-rare right align-middle"
              />
            </div>
            <div className="hidden md:inline min-w-16 h-12 mx-2 float-end text-center">
              <h1 className="text-xl">{profile?.displayName}</h1>
              <h3 className="text-xs">
                {profile?.ducats}/{profile?.tickets}
              </h3>
            </div>
          </Link>
        </div>
      );
    }
  };

  // Render nav links with icons
  const renderLinks = () => {
    return (
      <>
        <Link
          href={"/inventory"}
          className="relative group flex flex-col items-center"
        >
          <FaBox className="icon" />
          <Tooltip>Ekwipunek</Tooltip>
        </Link>
        <Link
          href={"/play"}
          className="relative group flex flex-col items-center"
        >
          <FaPlay className="icon" />
          <Tooltip>Graj</Tooltip>
        </Link>
        <Link
          href={"/store"}
          className="relative group flex flex-col items-center"
        >
          <FaStore className="icon" />
          <Tooltip>Sklep</Tooltip>
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-background fixed bottom-0 md:relative md:top-0 w-full flex justify-between items-center p-4 border-t-2 sm:border-t-0 md:border-b-2 z-10">
      <div className="hidden md:flex justify-between items-center mx-2 w-full">
        <div>
          <Logo />
        </div>
        <div className="flex justify-center items-center gap-x-16">
          {renderLinks()}
        </div>
        <div className="flex justify-center items-center">
          {renderAdmin()}
          {renderProfile()}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden w-full justify-center items-center">
        <div className="flex justify-center items-center gap-x-8">
          <Logo />
          {renderLinks()}
          {renderAdmin()}
          {renderProfile()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
