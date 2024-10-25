import CardProps from "@/types/CardProps";
import Image from "next/image";
import React from "react";

// Generate cards
const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  return (
    <div className={`card ${card.rarity}`}>
      <h2 className={`text-xl font-bold text-center text-wrap px-2`}>{card.name}</h2>
      <Image
        src={card.img}
        alt={card.name}
        width={64}
        height={64}
        className={`rounded border-2 transform-transition duration-300 ease-in-out]`}
      />
      <p className="text-center text-sm text-wrap italic px-2">
        {card.description}
      </p>
    </div>
  );
};

export default Card;
