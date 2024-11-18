import React, { useEffect, useState } from "react";
import UnoGame from "./UnoGame";
import LoadingOverlay from "@/components/Loading";
import { Location } from "./constants";

const UnoMechanMode = () => {
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Symulujemy ładowanie przez 2 sekundy
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Możesz to zmienić w zależności od czasu ładowania danych
  }, []);

  // Change current location in game
  const changeLocation = (location: Location) => {
    setCurrentLocation(location);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {loading ? (
        <LoadingOverlay message="UNO: Mechan Edition" />
      ) : (
        <div
          className="flex flex-col justify-center items-center gap-4 w-full"
          style={{
            backgroundImage: `url(${currentLocation?.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh", // Pełny ekran
          }}
        >
          <UnoGame setLocation={changeLocation} />
          {/* Dodaj tutaj logikę dla rozgrywki */}
        </div>
      )}
    </div>
  );
};

export default UnoMechanMode;
