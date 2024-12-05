import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import UnoGameState from "@/types/uno_mechan/UnoGameState";

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
    card.location === gameState.currentLocation ||
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
