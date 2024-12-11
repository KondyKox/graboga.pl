import React, { useEffect, useState } from "react";
import UnoGame from "./UnoGame";
import LoadingOverlay from "@/components/Loading";
import { LOCATIONS } from "./constants";
import useUnoDeck from "@/hooks/useUnoDeck";
import Modal from "@/components/Modal";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import {
  canPlay,
  changeTurn,
  checkWinner,
  dealCards,
  formatLocationName,
  handleLocationSelect,
} from "./utils";
import UnoGameState from "@/types/uno_mechan/UnoGameState";
import UnoPlayer from "@/types/uno_mechan/UnoPlayer";
import { handleBotTurn, initializeBots } from "./bot";
import { drawCardFromDeck, executeAction } from "./cardActions";
import UnoInstructions from "@/game_modes/uno_mechan/UnoInstructions";

// TODO: Naprawić gre z botami, bo coś sie psuje czasem ostatni.
// TODO: Czasem bot rzuca 2 karty naraz
// TODO: Uprościć ten kod
// TODO: efekty kart zrobić aby działały
const UnoMechanMode = () => {
  const { deck, loading } = useUnoDeck();
  const [showGame, setShowGame] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isClockwise, setIsClockwise] = useState<boolean>(true);
  const [pendingLegendaryCard, setPendingLegendaryCard] =
    useState<UnoCardProps | null>(null);
  const [gameState, setGameState] = useState<UnoGameState>({
    currentCard: null,
    currentLocation: null,
    players: [],
    currentPlayerIndex: 0,
    winner: null,
  });
  // Show instructions with animation

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

    const botPlayers = initializeBots(3);

    setGameState({
      currentCard: null,
      currentLocation: null,
      players: [humanPlayer, ...botPlayers],
      currentPlayerIndex: 0,
      winner: null,
    });
  };

  // Inicjalizacja talii
  const initializeDeck = () => {
    if (!loading && deck.length > 0) {
      const firstNonLegendaryCard = deck.find(
        (card) => card.rarity !== "legendary" && card.rarity !== "cursed"
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

      // Używamy funkcji dealCards, aby rozdać karty
      const dealtCards = dealCards(deck, gameState.players.length);

      // Uaktualniamy stan graczy, przypisując im karty
      const playersWithCards = gameState.players.map((player, index) => ({
        ...player,
        cards: dealtCards[index], // Przypisujemy rozdane karty
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
    if (card.rarity === "legendary") {
      setPendingLegendaryCard(card);
      if (!currentPlayer?.isBot) setIsModalOpen(true);
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
          pendingLegendaryCard,
          setGameState,
          setIsModalOpen,
          setPendingLegendaryCard,
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
                      pendingLegendaryCard,
                      setGameState,
                      setIsModalOpen,
                      setPendingLegendaryCard,
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
