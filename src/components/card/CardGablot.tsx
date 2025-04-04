import { FaPlus } from "react-icons/fa";
import Card from "./Card";
import CardProps from "@/types/CardProps";

interface CardGablotProps {
  cards: CardProps[];
  index: number;
  onClick: (card: CardProps) => void;
  isOwnProfile: boolean;
}

const CardGablot = ({
  cards,
  index,
  onClick,
  isOwnProfile,
}: CardGablotProps) => {
  return (
    <div
      key={index}
      onClick={() => {
        if (isOwnProfile) onClick(cards[index]);
      }}
      className={`group rounded-lg transition-colors duration-300 ease-in-out hover:border-legendary cursor-pointer flex justify-center 
                    items-center text-foreground flex-1 max-h-52 md:max-h-56 lg:max-h-72 min-h-52 ${
                      cards[index] && isOwnProfile ? "" : "border-2 border-epic"
                    }`}
    >
      {cards[index] ? (
        <div className="w-full">
          <Card card={cards[index]} />
        </div>
      ) : (
        isOwnProfile && (
          <FaPlus className="w-6 h-6 transition-all duration-300 ease-in-out group-hover:scale-125 text-epic group-hover:text-legendary" />
        )
      )}
    </div>
  );
};

export default CardGablot;
