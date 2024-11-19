import React, { useEffect, useState } from "react";
import UnoGame from "./UnoGame";
import LoadingOverlay from "@/components/Loading";
import { Location, LOCATIONS } from "./constants";
import UnoCardProps from "@/types/UnoCardProps";
import useUnoDeck from "@/hooks/useUnoDeck";

const UnoMechanMode = () => {
  const { deck, loading } = useUnoDeck();
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentCard, setCurrentCard] = useState<UnoCardProps | null>(null);
  const [playerCards, setPlayerCards] = useState<UnoCardProps[]>([]);
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
      setCurrentLocation(initialLocation || null);
    }
  }, [loading, deck]);

  // Change current location in game
  const changeLocation = (location: Location) => {
    setCurrentLocation(location);
  };

  // Drawing a card from the deck
  const drawCard = () => {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];

    setPlayerCards((prev) => [...prev, newCard]);
    setIsTurn(false); // Koniec tury gracza
  };

  const canPlay = (card: UnoCardProps): boolean => {
    return (
      card.location === currentLocation ||
      card.rarity === currentCard?.rarity ||
      card.id === currentCard?.id ||
      card.rarity === "legendary"
    );
  };

  const playCard = (card: UnoCardProps) => {
    if (!canPlay(card) || !isTurn) return;
    setCurrentCard(card);

    // Znalezienie pełnego obiektu Location na podstawie nazwy
    const newLocation = LOCATIONS.find((loc) => loc.name === card.location);
    setCurrentLocation(newLocation || null);

    setPlayerCards((prev) => prev.filter((c) => c.id !== card.id));
    setIsTurn(false);
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
          <UnoGame
            playerCards={playerCards}
            currentCard={currentCard}
            isTurn={isTurn}
            canPlay={canPlay}
            onPlayCard={playCard}
            onDrawCard={drawCard}
          />
        </div>
      )}
    </div>
  );
};

export default UnoMechanMode;
