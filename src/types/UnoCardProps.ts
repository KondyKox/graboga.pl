import { ACTIONS, LOCATIONS } from "@/game_modes/uno_mechan/constants";
import CardProps from "./CardProps";

type UnoCardProps = CardProps & {
  action: (typeof ACTIONS)[number] | null;
  location: (typeof LOCATIONS)[number]["name"] | null;
};

export default UnoCardProps;
