import Image from "next/image";
import Link from "next/link";
import React from "react";

// Just the Logo component
const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="hover:drop-shadow-logo transition-all duration-300 ease-in-out"
    >
      <Image
        className="w-8 md:w-12 lg:w-12"
        src="/logo.png" // TODO: .png to .svg
        alt="Logo"
        width={64}
        height={64}
      />
    </Link>
  );
};

export default Logo;
