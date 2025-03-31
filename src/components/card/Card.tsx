import CardProps from "@/types/CardProps";
import Image from "next/image";
import React from "react";

type Rarity = "common" | "rare" | "epic" | "legendary" | "cursed";

const rarityStyles: Record<
  Rarity,
  { container: string; header: string; image: string }
> = {
  common: {
    container: "border-common hover:shadow-common",
    header: "text-common",
    image: "border-common group-hover:drop-shadow-common",
  },
  rare: {
    container: "border-rare hover:shadow-rare",
    header: "text-rare",
    image: "border-rare group-hover:drop-shadow-rare",
  },
  epic: {
    container: "border-epic hover:shadow-epic",
    header: "text-epic",
    image: "border-epic group-hover:drop-shadow-epic",
  },
  legendary: {
    container: "border-legendary hover:shadow-legendary",
    header: "text-legendary",
    image: "border-legendary group-hover:drop-shadow-legendary",
  },
  cursed: {
    container: "border-cursed hover:shadow-cursed",
    header: "text-cursed",
    image: "border-cursed group-hover:drop-shadow-cursed",
  },
};

const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  const rarity = card.rarity as Rarity;

  return (
    <div
      className={`bg-none rounded px-1 py-2 md:px-2 md:py-4 flex flex-col flex-grow justify-around gap-2 items-center w-auto max-w-[150px] h-full min-h-[200px] 
                  border-2 transition duration-300 ease-in-out group cursor-pointer ${rarityStyles[rarity].container}`}
    >
      <h2
        className={`text-sm md:text-lg font-bold text-center text-wrap ${rarityStyles[rarity].header}`}
      >
        {card.name}
      </h2>
      <Image
        src={card.img}
        alt={card.name}
        width={128}
        height={128}
        className={`rounded border-2 transform transition duration-300 ease-in-out w-2/3 ${rarityStyles[rarity].image}`}
      />
      <p className="text-center text-xs text-wrap italic">{card.description}</p>
    </div>
  );
};

export default Card;
