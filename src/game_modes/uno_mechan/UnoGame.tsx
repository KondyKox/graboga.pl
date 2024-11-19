"use client";

import UnoCardProps from "@/types/UnoCardProps";
import UnoCard from "@/components/card/UnoCard";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";

const UnoGame = ({
  playerCards,
  currentCard,
  isTurn,
  canPlay,
  onPlayCard,
  onDrawCard,
}: {
  playerCards: UnoCardProps[];
  currentCard: UnoCardProps | null;
  isTurn: boolean;
  canPlay: (card: UnoCardProps) => boolean;
  onPlayCard: (card: UnoCardProps) => void;
  onDrawCard: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      <div className="flex justify-around items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <h3
            className="text-4xl text-wrap text-gradient"
            style={{
              WebkitTextStroke: ".25px white", // Obrys tekstu
            }}
          >
            Aktualna Karta
          </h3>
          {currentCard && <UnoCard card={currentCard} />}
        </div>
        <div className="flex justify-center items-center">
          {isTurn && (
            <div className="group relative flex flex-col justify-center items-center">
              <Image
                src={"/uno_mechan/uno_cards.png"}
                alt="Dobierz kartę"
                width={128}
                height={128}
                onClick={onDrawCard}
                className="cursor-pointer hover:drop-shadow-special"
              />
              <Tooltip>Dobierz Kartę</Tooltip>
            </div>
          )}
          {!isTurn && (
            <h3
              className="text-4xl text-wrap text-gradient"
              style={{
                WebkitTextStroke: ".25px white", // Obrys tekstu
              }}
            >
              Teraz tura przeciwnika...
            </h3>
          )}
        </div>
      </div>

      {/* <div className="grid grid-cols-7 place-content-center w-full h-auto max-h-[50vh] gap-2 border-t-4 py-2 overflow-y-auto"> */}
      <div className="flex flex-wrap justify-center items-center w-1/2 h-auto max-h-[50vh] gap-2 border-t-4 py-2 overflow-y-auto">
        {playerCards.map((unoCard, index) => (
          <div
            key={index}
            onClick={() => onPlayCard(unoCard)}
            className={`transition-all ${
              canPlay(unoCard)
                ? "cursor-pointer"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <UnoCard card={unoCard} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnoGame;
