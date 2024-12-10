import CardProps from "@/types/CardProps";
import Image from "next/image";
import React from "react";

const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  const rarity = card.rarity;

  return (
    <div
      className={`bg-none rounded px-2 py-4 flex flex-col justify-around items-center w-52 h-80 border-2 transition 
                  duration-300 ease-in-out group border-${rarity} hover:shadow-${rarity}`}
    >
      <h2
        className={`text-xl font-bold text-center text-wrap px-2 h-10 text-${rarity}`}
      >
        {card.name}
      </h2>
      <Image
        src={card.img}
        alt={card.name}
        width={128}
        height={128}
        className={`rounded border-2 transform transition duration-300 ease-in-out w-28 my-2 border-${rarity} 
                    group-hover:drop-shadow-${rarity}`}
      />
      <p className="text-center text-sm text-wrap italic px-2">
        {card.description}
      </p>
    </div>
  );
};

export default Card;
