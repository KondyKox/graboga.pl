import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import UnoGameState from "@/types/uno_mechan/UnoGameState";
import { Action } from "./constants";

// Format location name for Modal (split words & make first letter capitalized)
export const formatLocationName = (name: string) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Rozdanie kart
export const dealCards = (
  deck: UnoCardProps[],
  numPlayers: number
): UnoCardProps[][] => {
  let dealtCards: UnoCardProps[][] = [];

  for (let i = 0; i < numPlayers; i++) {
    dealtCards.push(deck.slice(i * 7, (i + 1) * 7)); // Każdy gracz dostaje 7 kart
  }

  return dealtCards;
};

// Check if card is playable
export const canPlay = (
  card: UnoCardProps,
  gameState: UnoGameState
): boolean => {
  return (
    card.location === gameState.currentLocation?.name ||
    card.rarity === gameState.currentCard?.rarity ||
    card.id === gameState.currentCard?.id ||
    card.rarity === "legendary"
  );
};

// Change players' turn
export const changeTurn = ({
  setGameState,
}: {
  setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
}) => {
  setGameState((prevState) => {
    const nextPlayerIndex =
      (prevState.currentPlayerIndex + 1) % prevState.players.length;

    return {
      ...prevState,
      currentPlayerIndex: nextPlayerIndex,
      players: prevState.players.map((player, index) => ({
        ...player,
        isTurn: index === nextPlayerIndex,
      })),
    };
  });
};

// Card action handler
export const handleCardAction = (action: Action) => {
  switch (action) {
    case "block":
      console.log("Player blocked");
      break;
    case "draw":
      console.log("Player draws cards");
      break;
    case "reverse":
      console.log("Turn reversed");
      break;
    case "reverse & +2":
      console.log("Turn reversed & next player draws cards");
      break;
    case "+2":
      console.log("Next player draw 2 cards");
      break;
    case "+4":
      console.log("Next player draw 4 cards");
      break;
    default:
      console.log("No card action");
      break;
  }
};

// Check if someone won
export const checkWinner = (
  gameState: UnoGameState,
  setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>
) => {
  const winner = gameState.players.find((player) => player.cards.length === 0);

  if (winner) {
    console.log(`${winner.name} wins!`);

    setGameState((prevState) => ({
      ...prevState,
      winner: winner,
    }));
    return true;
  }
  return false;
};
