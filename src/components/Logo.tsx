import Image from "next/image";
import Link from "next/link";
import React from "react";

// Just the Logo component
const Logo: React.FC<{ bigSize?: boolean }> = ({ bigSize = false }) => {
  return (
    <Link
      href="/"
      className="hover:drop-shadow-logo transition-all duration-300 ease-in-out"
    >
      <Image
        className={`${!bigSize ? "w-8 md:w-12" : "w-64 h-64"}`}
        src="/logo.svg"
        alt="Logo"
        width={64}
        height={64}
      />
    </Link>
  );
};

export default Logo;
