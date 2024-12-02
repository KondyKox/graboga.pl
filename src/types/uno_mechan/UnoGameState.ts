import { Location } from "@/game_modes/uno_mechan/constants";
import UnoCardProps from "./UnoCardProps";

interface UnoGameState {
  currentCard: UnoCardProps | null;
  currentLocation: Location | null;
  playerCards: UnoCardProps[];
  botCards: UnoCardProps[][];
  currentPlayerIndex: number;
  isTurn: boolean;
}

export default UnoGameState;
