import UnoCardProps from "./UnoCardProps";

type UnoPlayer = {
  _id: string;              // ID from MongoDB
  name: string;             // Player name from MongoDB
  cards: UnoCardProps[];    // Player's cards in deck
  isTurn: boolean;          // Is player's turn
  score: number;            // Player score
  isBot: boolean;           // Is player a bot
};

export default UnoPlayer;
