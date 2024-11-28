import Link from "next/link";
import React from "react";

const Play = () => {
  const gameModes = [
    { name: "UNO: Mechan Edition", path: "uno_mechan" },
    { name: "Ez Matura", path: "ez_matura" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <h2 className="sub-header text-center">W co chciałbyś zagrać?</h2>
      <div className="flex flex-col justify-center items-center gap-4 md:w-1/2 lg:w-1/4">
        {gameModes.map((mode, index) => (
          <Link
            key={index}
            href={`/play/${mode.path}`}
            className="w-full p-2 bg-rare rounded text-xl text-center transition-all duration-300 ease-in-out hover:bg-epic"
          >
            {mode.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Play;
