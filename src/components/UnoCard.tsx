import React from "react";
import UnoCardProps from "@/types/UnoCardProps";
import Card from "@/components/Card";
import { LOCATIONS } from "@/game_modes/uno_mechan/constants";

const UnoCard: React.FC<{ card: UnoCardProps }> = ({ card }) => {
  // Znalezienie odpowiedniej lokacji dla tła
  const location = LOCATIONS.find((loc) => loc.name === card.location);

  return (
    <div
      className="flex justify-center items-center rounded overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `url(${location?.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card card={card} />
    </div>
  );
};

export default UnoCard;
