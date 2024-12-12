import React, { useEffect, useState } from "react";
import UnoGame from "./components/UnoGame";
import LoadingOverlay from "@/components/Loading";
import { LOCATIONS } from "./constants";
import useUnoDeck from "@/hooks/useUnoDeck";
import Modal from "@/components/Modal";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import {
  canPlay,
  changeTurn,
  checkWinner,
  formatLocationName,
  handleLocationSelect,
} from "./utils/utils";
import UnoGameState from "@/types/uno_mechan/UnoGameState";
import { handleBotTurn } from "./utils/bot";
import { drawCardFromDeck, executeAction } from "./utils/cardActions";
import UnoInstructions from "@/game_modes/uno_mechan/components/UnoInstructions";
import { initializeDeck, initializeGame } from "./utils/setup";

// TODO: Naprawić gre z botami, bo coś sie psuje czasem ostatni.
// TODO: Czasem bot rzuca 2 karty naraz
// TODO: efekty kart zrobić aby działały
const UnoMechanMode = () => {
  const { deck, loading } = useUnoDeck();
  const [showGame, setShowGame] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isClockwise, setIsClockwise] = useState<boolean>(true);
  const [gameState, setGameState] = useState<UnoGameState>({
    currentCard: null,
    currentLocation: null,
    players: [],
    currentPlayerIndex: 0,
    winner: null,
  });

  useEffect(() => {
    initializeGame({ setGameState });
  }, []);

  useEffect(() => {
    if (!loading && deck.length > 0)
      initializeDeck({ gameState, setGameState, deck });
  }, [loading, deck]);

  // Bot turn handling (ai logic)
  useEffect(() => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (currentPlayer?.isBot) {
      handleBotTurn({
        gameState,
        setGameState,
        playCard,
        drawCard,
      });
    }
  }, [gameState.currentPlayerIndex]);

  // Display game instructions at the start of the game
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const timer = setTimeout(() => setShowGame(true), 6000);

    return () => clearTimeout(timer);
  }, []);

  // Play clicked card if playable
  const playCard = (card: UnoCardProps) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (!canPlay(card, gameState) || !currentPlayer.isTurn) return;

    // Handle legendary card
    if (card.rarity === "legendary" && !currentPlayer?.isBot) {
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
    }));

    // If card has different location, change it
    if (card.location && card.location !== gameState.currentLocation?.name) {
      const location = LOCATIONS.find((loc) => loc.name === card.location);

      if (location)
        handleLocationSelect({
          location,
          setGameState,
          setIsModalOpen,
        });
      else console.error(`Location not found for name: ${card.location}`);
    }

    checkWinner(gameState, setGameState); // Check if player wins

    // Play card action
    if (card.action)
      executeAction(card.action, {
        setGameState,
        gameState,
        deck,
        drawCard,
        isClockwise,
        setIsClockwise,
      });
    else changeTurn({ setGameState, isClockwise }); // Zmiana tury
  };

  // Drawing a card from the deck
  const drawCard = () => {
    drawCardFromDeck({ deck, setGameState });
    changeTurn({ setGameState, isClockwise });
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
      ) : !showGame ? (
        <UnoInstructions />
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
            onPlayCard={playCard}
            onDrawCard={drawCard}
            players={gameState.players}
            gameState={gameState}
            isClockwise={isClockwise}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h3 className="text-xl font-bold mb-6">Wybierz Lokalizację</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {LOCATIONS.map((location) => (
                <button
                  key={location.name}
                  onClick={() =>
                    handleLocationSelect({
                      location,
                      setGameState,
                      setIsModalOpen,
                    })
                  }
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
