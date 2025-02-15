import React from "react";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import Card from "@/components/card/Card";
import { LOCATIONS } from "@/game_modes/locations";

const UnoCard: React.FC<{ card: UnoCardProps }> = ({ card }) => {
  // Znalezienie odpowiedniej lokacji dla tła
  const location = LOCATIONS.find((loc) => loc.name === card.location);

  return (
    <div
      className="relative flex justify-center items-center rounded overflow-hidden duration-300 ease-in-out 
                  hover:-translate-y-3 w-52 h-80 bg-background"
      style={{
        backgroundImage: `url(${location?.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Wyświetlanie karty */}
      <Card card={card} />

      {/* Wyświetlanie akcji */}
      {card.action && (
        <div
          className="absolute top-0 right-0 transform text-sm font-bold px-2 py-1 rounded-b shadow"
          style={{
            backgroundColor:
              card.rarity === "cursed"
                ? "var(--clr-cursed)"
                : card.rarity === "legendary"
                ? "var(--clr-legendary)"
                : card.rarity === "epic"
                ? "var(--clr-epic)"
                : "",
          }}
        >
          {card.action.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UnoCard;
