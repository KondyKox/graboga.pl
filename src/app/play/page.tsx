import Link from "next/link";
import React from "react";

const Play = () => {
  const gameModes = [
    { name: "UNO: Mechan Edition", path: "uno_mechan" },
    { name: "Running Mucha", path: "running_mucha" },
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
            className="w-full py-2 px-4 bg-rare rounded md:text-xl text-center transition-all duration-300 ease-in-out hover:bg-epic"
          >
            {mode.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mt-8 p-4 text-justify border-t-2">
        <h6 className="text-red-600 text-lg md:text-2xl">Uwaga!</h6>
        <p className="text-gray-500 text-sm md:text-lg">
          Każdy z wyżej wymienionych trybów gry jest doskonały.
          <br /> Ewentualne błędy podczas rozgrywki są wyłączną winą
          użytkownika.
          <br /> Wszelkie skargi i zażalenia proszę zatrzymać dla siebie,
          ponieważ twórcy <span className="text-epic">GRABOGA.PL</span> nie są
          nimi zainteresowani.
        </p>
      </div>
    </div>
  );
};

export default Play;
