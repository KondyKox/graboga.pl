import UnoCardProps from "@/types/uno_mechan/UnoCardProps";

// Format location name for Modal (split words & make first letter capitalized)
export const formatLocationName = (name: string) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Tasowanie talii
export const shuffleDeck = (deck: UnoCardProps[]): UnoCardProps[] => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

// Rozdanie kart
export const dealCards = (
  deck: UnoCardProps[],
  numPlayers: number
): UnoCardProps[][] => {
  let dealtCards: UnoCardProps[][] = [];
  let shuffledDeck = shuffleDeck(deck);

  for (let i = 0; i < numPlayers; i++) {
    dealtCards.push(shuffledDeck.slice(i * 7, (i + 1) * 7)); // Każdy gracz dostaje 7 kart
  }

  return dealtCards;
};
