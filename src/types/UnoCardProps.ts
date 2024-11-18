import CardProps from "./CardProps";

type UnoCardProps = CardProps & {
  action: "normal" | "skip" | "draw" | "reverse" | "changeLocation";
  location: "szatnia" | "sala303" | "klasaPolski";
};

export default UnoCardProps;
