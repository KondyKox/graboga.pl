import React, { useEffect, useState } from "react";
import UnoGame from "./UnoGame";
import LoadingOverlay from "@/components/Loading";
import { Location, LOCATIONS } from "./constants";
import UnoCardProps from "@/types/UnoCardProps";
import useUnoDeck from "@/hooks/useUnoDeck";
import Modal from "@/components/Modal";

// Format location name (split words & make first letter capitalized)
const formatLocationName = (name: string) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const UnoMechanMode = () => {
  const { deck, loading } = useUnoDeck();
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentCard, setCurrentCard] = useState<UnoCardProps | null>(null);
  const [playerCards, setPlayerCards] = useState<UnoCardProps[]>([]);
  const [isTurn, setIsTurn] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingLegendaryCard, setPendingLegendaryCard] =
    useState<UnoCardProps | null>(null);

  useEffect(() => {
    if (!loading && deck.length > 0) {
      // Wybierz pierwszą kartę niebędącą `legendary`
      const firstNonLegendaryCard = deck.find(
        (card) => card.rarity !== "legendary"
      );

      if (firstNonLegendaryCard) {
        setCurrentCard(firstNonLegendaryCard);
        const initialLocation = LOCATIONS.find(
          (loc) => loc.name === firstNonLegendaryCard.location
        );
        setCurrentLocation(initialLocation || null);
      }

      setPlayerCards(deck.slice(1, 8));
    }
  }, [loading, deck]);

  const canPlay = (card: UnoCardProps): boolean => {
    return (
      card.location === currentLocation ||
      card.rarity === currentCard?.rarity ||
      card.id === currentCard?.id ||
      card.rarity === "legendary"
    );
  };

  // Play clicked card if playable
  const playCard = (card: UnoCardProps) => {
    if (!canPlay(card) || !isTurn) return;

    // Handle legendary card
    if (card.rarity === "legendary") {
      setPendingLegendaryCard(card);
      setIsModalOpen(true);
      return;
    }

    setCurrentCard(card);

    // If card has different location, change it
    if (card.location && card.location !== currentLocation?.name) {
      const newLocation = LOCATIONS.find((loc) => loc.name === card.location);
      setCurrentLocation(newLocation || null); // New location
    }

    setPlayerCards((prev) => prev.filter((c) => c.id !== card.id));
    setIsTurn(false);
  };

  // Drawing a card from the deck
  const drawCard = () => {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];

    setPlayerCards((prev) => [...prev, newCard]);
    setIsTurn(false); // End player's turn
  };

  // Select location if legendary card played
  const handleLocationSelect = (location: Location) => {
    setCurrentLocation(location);
    if (pendingLegendaryCard) {
      setPlayerCards((prev) =>
        prev.filter((c) => c.id !== pendingLegendaryCard.id)
      );
      setCurrentCard(pendingLegendaryCard);
    }
    setIsModalOpen(false);
    setPendingLegendaryCard(null);
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
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h3 className="text-xl font-bold mb-6">Wybierz Lokalizację</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {LOCATIONS.map((location) => (
                <button
                  key={location.name}
                  onClick={() => handleLocationSelect(location)}
                  className="btn px-6"
                >
                  {formatLocationName(location.name)}
                </button>
              ))}
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default UnoMechanMode;
