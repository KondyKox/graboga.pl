import UnoGameState from "@/types/uno_mechan/UnoGameState";
import { LOCATIONS } from "../constants";
import { dealCards } from "./utils";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import UnoPlayer from "@/types/uno_mechan/UnoPlayer";
import { initializeBots } from "./bot";

// Inicjalizacja gry
export const initializeGame = ({
  setGameState,
}: {
  setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
}) => {
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
export const initializeDeck = ({
  gameState,
  setGameState,
  deck,
}: {
  gameState: UnoGameState;
  setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
  deck: UnoCardProps[];
}) => {
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
};
