"use client";

import { useEffect, useState } from "react";

const UnoInstructions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => setIsVisible(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center text-center mt-12 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="header">
        Witaj w <span className="text-gradient">UNO: Mechan Edition!</span>
      </h1>
      <h2 className="sub-header">
        <span className="text-cursed">Uwaga!</span> Ta gra ma *parę błędów
      </h2>
      <p className="text-sm text-gray-600">*parę czyli dość dużo xD</p>
    </div>
  );
};

export default UnoInstructions;
