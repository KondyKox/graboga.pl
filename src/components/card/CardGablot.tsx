import { FaPlus } from "react-icons/fa";
import Card from "./Card";
import CardProps from "@/types/CardProps";

interface CardGablotProps {
  cards: CardProps[];
  index: number;
  onClick: (card: CardProps) => void;
}

const CardGablot = ({ cards, index, onClick }: CardGablotProps) => {
  return (
    <div
      key={index}
      onClick={() => onClick(cards[index])}
      className={`group rounded-lg transition-colors duration-300 ease-in-out hover:border-legendary cursor-pointer flex justify-center 
                    items-center text-foreground flex-1 ${
                      cards[index] ? "" : "border-2 border-epic"
                    }`}
    >
      {cards[index] ? (
        <div className="w-full">
          <Card card={cards[index]} />
        </div>
      ) : (
        <FaPlus className="w-6 h-6 transition-all duration-300 ease-in-out group-hover:scale-125 text-epic group-hover:text-legendary" />
      )}
    </div>
  );
};

export default CardGablot;
