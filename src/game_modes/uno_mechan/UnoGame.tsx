"use client";

import UnoCard from "@/components/card/UnoCard";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import UnoPlayer from "@/types/uno_mechan/UnoPlayer";

const UnoGame = ({
  currentCard,
  canPlay,
  onPlayCard,
  onDrawCard,
  players,
}: {
  currentCard: UnoCardProps | null;
  canPlay: (card: UnoCardProps) => boolean;
  onPlayCard: (card: UnoCardProps) => void;
  onDrawCard: () => void;
  players: UnoPlayer[];
}) => {
  const humanPlayer = players[0];
  console.log(players);

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
      <div className="flex justify-between items-center w-1/2">
        <div className="flex justify-center items-center">
          {humanPlayer.isTurn ? (
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
          ) : (
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
        <div
          className="flex flex-col justify-center items-center"
          style={{ scale: 0.9 }}
        >
          <h3
            className="text-4xl text-wrap text-gradient"
            style={{
              WebkitTextStroke: ".25px white", // Obrys tekstu
              paddingBottom: "1rem",
            }}
          >
            Aktualna Karta
          </h3>
          {currentCard && <UnoCard card={currentCard} />}
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h4
            className="sub-header"
            style={{
              fontSize: "1.5rem",
            }}
          >
            Gracze
          </h4>
          {players.map(
            (player) =>
              player !== humanPlayer && (
                <div
                  className={`flex justify-center items-center gap-2 p-2 w-full rounded-full ${
                    player.isTurn ? "bg-epic" : "bg-rare"
                  }`}
                >
                  <Image
                    src={"/donejtor.png"}
                    alt={player.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <span className={`px-2 ${player.isTurn && "font-bold"}`}>
                    {player.name}
                  </span>
                </div>
              )
          )}
        </div>
      </div>

      <div
        className="flex flex-wrap items-center w-1/2 h-auto max-h-[50vh] gap-4 border-t-4 overflow-y-auto"
        style={{ scale: 0.8, padding: "1.5rem 0" }}
      >
        {humanPlayer.cards.map((unoCard, index) => (
          <div
            key={index}
            onClick={() => onPlayCard(unoCard)}
            className={`transition-all ${
              humanPlayer.isTurn
                ? canPlay(unoCard)
                  ? "cursor-pointer"
                  : "opacity-50 hover:opacity-100"
                : "opacity-50 pointer-events-none"
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
