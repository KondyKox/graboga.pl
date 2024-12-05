import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import UnoGameState from "@/types/uno_mechan/UnoGameState";
import { canPlay } from "./utils";
import UnoPlayer from "@/types/uno_mechan/UnoPlayer";
import { LOCATIONS } from "./constants";
import { SetStateAction } from "react";

// Initialize bots to play with
export const initializeBots = (numberOfBots: number): UnoPlayer[] => {
  return Array.from({ length: numberOfBots }, (_, index) => ({
    _id: `bot${index + 1}`,
    name: `Bot ${index + 1}`,
    cards: [],
    isTurn: false,
    score: 0,
    isBot: true,
  }));
};

// Handle bot's turn
export const handleBotTurn = ({
  gameState,
  setGameState,
  playCard,
  drawCard,
}: {
  gameState: UnoGameState;
  setGameState: React.Dispatch<SetStateAction<UnoGameState>>;
  playCard: (card: UnoCardProps) => void;
  drawCard: () => void;
}) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  if (!currentPlayer.isBot) return; // If player is not bot - return

  // Bot chooses card to play
  const botCards = currentPlayer.cards;
  const playableCard = botCards.find((card) => canPlay(card, gameState));

  if (playableCard) {
    // Jeśli bot ma kartę do zagrania, gra nią
    if (playableCard.rarity === "legendary") {
      // Jeśli karta jest legendarna, bot wybiera lokację
      const locationCounts = LOCATIONS.reduce((acc, location) => {
        // Zliczamy karty, które pasują do danej lokacji
        const count = botCards.filter(
          (card) => card.location === location.name
        ).length;
        acc[location.name] = count;
        return acc;
      }, {} as Record<string, number>);

      // Wybieramy lokację z najwięcej kart
      const bestLocationName = Object.keys(locationCounts).reduce((a, b) =>
        locationCounts[a] > locationCounts[b] ? a : b
      );
      // Znajdujemy obiekt lokacji
      const bestLocation = LOCATIONS.find(
        (loc) => loc.name === bestLocationName
      );

      // Przypisujemy lokalizację do game state
      if (bestLocation) {
        setGameState((prevState) => ({
          ...prevState,
          currentLocation: bestLocation, // Ustawiamy nową lokację
        }));
      }
    }
    setTimeout(() => playCard(playableCard), 2000); // Dodajemy lekkie opóźnienie dla realizmu
  }
  // Jeśli bot nie ma kart do zagrania, dobiera kartę
  else setTimeout(() => drawCard(), 2000); // Dodajemy opóźnienie
};
