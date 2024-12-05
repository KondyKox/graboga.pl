import { Location } from "@/game_modes/uno_mechan/constants";
import UnoCardProps from "./UnoCardProps";
import UnoPlayer from "./UnoPlayer";

interface UnoGameState {
  currentCard: UnoCardProps | null;
  currentLocation: Location | null;
  players: UnoPlayer[];
  currentPlayerIndex: number;
  winner: UnoPlayer | null;
}

export default UnoGameState;
