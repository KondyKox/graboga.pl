import React, { useEffect, useState } from "react";
import UnoGame from "./UnoGame";
import LoadingOverlay from "@/components/Loading";
import { Location, LOCATIONS } from "./constants";
import useUnoDeck from "@/hooks/useUnoDeck";
import Modal from "@/components/Modal";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import { formatLocationName, shuffleDeck } from "./utils";
import UnoGameState from "@/types/uno_mechan/UnoGameState";

const UnoMechanMode = () => {
  const { deck, loading } = useUnoDeck();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingLegendaryCard, setPendingLegendaryCard] =
    useState<UnoCardProps | null>(null);
  const [playerCards, setPlayerCards] = useState<UnoCardProps[]>([]);
  const [oppenetCards, setOpponentCards] = useState<UnoCardProps[]>([]);
  const [gameState, setGameState] = useState<UnoGameState>({
    currentCard: null,
    currentLocation: null,
    playerCards: [],
    botCards: [[], [], []],
    currentPlayerIndex: 0,
    isTurn: true,
  });

  useEffect(() => {
    if (!loading && deck.length > 0) {
      // Wybierz pierwszą kartę niebędącą `legendary`
      const firstNonLegendaryCard = deck.find(
        (card) => card.rarity !== "legendary"
      );

      if (firstNonLegendaryCard) {
        setGameState((prevState) => ({
          ...prevState,
          currentCard: firstNonLegendaryCard,
        }));

        const initialLocation = LOCATIONS.find(
          (loc) => loc.name === firstNonLegendaryCard.location
        );
        setGameState((prevState) => ({
          ...prevState,
          currentLocation: initialLocation || null,
        }));
      }

      // Losuj karty dla graczy
      shuffleDeck({ deck: deck, setCards: setPlayerCards });
      shuffleDeck({ deck: deck, setCards: setOpponentCards });
    }
  }, [loading, deck]);

  // Check if card is playable
  const canPlay = (card: UnoCardProps): boolean => {
    return (
      card.location === gameState.currentLocation ||
      card.rarity === gameState.currentCard?.rarity ||
      card.id === gameState.currentCard?.id ||
      card.rarity === "legendary"
    );
  };

  // Play clicked card if playable
  const playCard = (card: UnoCardProps) => {
    if (!canPlay(card) || !gameState.isTurn) return;

    // Handle legendary card
    if (card.rarity === "legendary") {
      setPendingLegendaryCard(card);
      setIsModalOpen(true);
      return;
    }

    setGameState((prevState) => ({
      ...prevState,
      currentCard: card,
    }));

    // If card has different location, change it
    if (card.location && card.location !== gameState.currentLocation?.name) {
      const newLocation = LOCATIONS.find((loc) => loc.name === card.location);
      setGameState((prevState) => ({
        ...prevState,
        currentLocation: newLocation || null,
      }));
    }

    setPlayerCards((prev) => prev.filter((c) => c.id !== card.id));
    setGameState((prevState) => ({
      ...prevState,
      isTurn: false,
    }));
  };

  // Drawing a card from the deck
  const drawCard = () => {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];

    setPlayerCards((prev) => [...prev, newCard]);
    setGameState((prevState) => ({
      ...prevState,
      isTurn: false,
    })); // End player's turn
  };

  // Select location if legendary card played
  const handleLocationSelect = (location: Location) => {
    setGameState((prevState) => ({
      ...prevState,
      currentLocation: location,
    }));

    if (pendingLegendaryCard) {
      setPlayerCards((prev) =>
        prev.filter((c) => c.id !== pendingLegendaryCard.id)
      );

      setGameState((prevState) => ({
        ...prevState,
        currentCard: pendingLegendaryCard,
      }));
    }
    setIsModalOpen(false);
    setPendingLegendaryCard(null);
    setGameState((prevState) => ({
      ...prevState,
      isTurn: false,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {loading ? (
        <LoadingOverlay message="UNO: Mechan Edition" />
      ) : window.innerWidth < 768 ? (
        <h2 className="header">
          Za mały ekran do gierki.
          <br /> 😢
        </h2>
      ) : (
        <div
          className="flex flex-col justify-center items-center gap-4 w-full"
          style={{
            backgroundImage: `url(${gameState.currentLocation?.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "110vh", // Pełny ekran
            paddingTop: "4rem",
          }}
        >
          <UnoGame
            playerCards={playerCards}
            currentCard={gameState.currentCard}
            isTurn={gameState.isTurn}
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
