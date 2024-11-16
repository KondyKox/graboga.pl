import CardProps from "./CardProps";

type UnoCardProps = CardProps & {
  action: "normal" | "reverse" | "draw" | "changeLocation";
  location?: string;
};

export default UnoCardProps;
