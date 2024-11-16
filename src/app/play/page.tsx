import Link from "next/link";
import React from "react";

const Play = () => {
  const gameModes = [{ name: "UNO: Mechan Edition", path: "uno_mechan" }];

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <h2 className="sub-header">W co chciałbyś zagrać?</h2>
      <div className="flex flex-col justify-center items-center w-1/4">
        {gameModes.map((mode, index) => (
          <Link
            key={index}
            href={`/play/${mode.path}`}
            className="w-full py-2 bg-rare rounded text-xl text-center transition-all duration-300 ease-in-out hover:bg-epic"
          >
            {mode.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Play;
