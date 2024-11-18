"use client";

import UnoCardProps from "@/types/UnoCardProps";
import { useEffect, useState } from "react";
import { Location, LOCATIONS } from "./constants";
import UnoCard from "@/components/UnoCard";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import useUnoDeck from "@/hooks/useUnoDeck";

const UnoGame = ({
  setLocation,
}: {
  setLocation: (location: Location) => void;
}) => {
  const { deck, loading } = useUnoDeck();
  const [playerCards, setPlayerCards] = useState<UnoCardProps[]>([]);
  const [currentCard, setCurrentCard] = useState<UnoCardProps>(
    {} as UnoCardProps
  );
  const [isTurn, setIsTurn] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && deck.length > 0) {
      setPlayerCards(deck.slice(1, 8)); // Gracz dostaje 7 kart
      const firstCard = deck[0];
      setCurrentCard(firstCard);

      // Ustaw lokację na podstawie pierwszej karty
      const initialLocation = LOCATIONS.find(
        (loc) => loc.name === firstCard.location
      );
      if (initialLocation) setLocation(initialLocation);
    }
  }, [loading, deck, setLocation]);

  // Drawing a card from the deck
  const drawCard = () => {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];

    setPlayerCards((prev) => [...prev, newCard]);
    // setDeck((prev) => prev.filter((_, index) => index !== randomIndex));
    setIsTurn(false); // Koniec tury gracza
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex justify-around items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl">Aktualna Karta</h3>
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
                onClick={drawCard}
                className="cursor-pointer hover:drop-shadow-special"
              />
              <Tooltip>Dobierz Kartę</Tooltip>
            </div>
          )}
          {!isTurn && <p className="text-center">Teraz tura przeciwnika...</p>}
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
        {playerCards.map((unoCard) => (
          <UnoCard key={unoCard.id} card={unoCard} />
        ))}
      </div>
    </div>
  );
};

export default UnoGame;
