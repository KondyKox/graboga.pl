import React, { useEffect, useState } from "react";
import UnoGame from "./UnoGame";
import LoadingOverlay from "@/components/Loading";
import { Location, LOCATIONS } from "./constants";
import useUnoDeck from "@/hooks/useUnoDeck";
import Modal from "@/components/Modal";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import { formatLocationName, shuffleDeck } from "./utils";
import UnoGameState from "@/types/uno_mechan/UnoGameState";
import UnoPlayer from "@/types/uno_mechan/UnoPlayer";

const UnoMechanMode = () => {
  const { deck, loading } = useUnoDeck();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pendingLegendaryCard, setPendingLegendaryCard] =
    useState<UnoCardProps | null>(null);
  const [gameState, setGameState] = useState<UnoGameState>({
    currentCard: null,
    currentLocation: null,
    players: [],
    currentPlayerIndex: 0,
  });

  // Inicjalizacja gry
  const initializeGame = () => {
    const humanPlayer: UnoPlayer = {
      _id: "humanPlayer",
      name: "Player 1",
      cards: [],
      isTurn: true,
      score: 0,
      isBot: false,
    };

    const botPlayers: UnoPlayer[] = Array.from({ length: 3 }, (_, index) => ({
      _id: `bot${index + 1}`,
      name: `Bot ${index + 1}`,
      cards: [],
      isTurn: false,
      score: 0,
      isBot: true,
    }));

    setGameState({
      currentCard: null,
      currentLocation: null,
      players: [humanPlayer, ...botPlayers],
      currentPlayerIndex: 0,
    });
  };

  // Inicjalizacja talii
  const initializeDeck = () => {
    if (!loading && deck.length > 0) {
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

      // Rozdaj karty graczom
      const shuffledDeck = shuffleDeck(deck);
      const playersWithCards = gameState.players.map((player, index) => ({
        ...player,
        cards: shuffledDeck.slice(index * 7, (index + 1) * 7),
      }));

      setGameState((prevState) => ({
        ...prevState,
        players: playersWithCards,
      }));
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    initializeDeck();
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
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (!canPlay(card) || !currentPlayer.isTurn) return;

    const nextPlayerIndex =
      (gameState.currentPlayerIndex + 1) % gameState.players.length;

    // Handle legendary card
    if (card.rarity === "legendary") {
      setPendingLegendaryCard(card);
      setIsModalOpen(true);
      return;
    }

    setGameState((prevState) => ({
      ...prevState,
      currentCard: card,
      players: prevState.players.map((player, index) =>
        index === prevState.currentPlayerIndex
          ? { ...player, cards: player.cards.filter((c) => c.id !== card.id) }
          : player
      ),
      currentPlayerIndex: nextPlayerIndex,
    }));

    // If card has different location, change it
    if (card.location && card.location !== gameState.currentLocation?.name) {
      const newLocation = LOCATIONS.find((loc) => loc.name === card.location);
      setGameState((prevState) => ({
        ...prevState,
        currentLocation: newLocation || null,
      }));
    }
  };

  // Drawing a card from the deck
  const drawCard = () => {
    if (deck.length === 0) return;

    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];
    const nextPlayerIndex =
      (gameState.currentPlayerIndex + 1) % gameState.players.length;

    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player, index) =>
        index === prevState.currentPlayerIndex
          ? { ...player, cards: [...player.cards, newCard] }
          : player
      ),
      currentPlayerIndex: nextPlayerIndex,
    }));
  };

  // Select location if legendary card played
  const handleLocationSelect = (location: Location) => {
    setGameState((prevState) => ({
      ...prevState,
      currentLocation: location,
      currentCard: pendingLegendaryCard,
      players: prevState.players.map((player, index) =>
        index === prevState.currentPlayerIndex
          ? {
              ...player,
              cards: player.cards.filter(
                (c) => c.id !== pendingLegendaryCard?.id
              ),
            }
          : player
      ),
      isTurn: false,
    }));

    setIsModalOpen(false);
    setPendingLegendaryCard(null);
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
            currentCard={gameState.currentCard}
            canPlay={canPlay}
            onPlayCard={playCard}
            onDrawCard={drawCard}
            players={gameState.players}
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
