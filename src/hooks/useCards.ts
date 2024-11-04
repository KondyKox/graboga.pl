import CardProps from "@/types/CardProps";
import { useEffect, useState } from "react";

/**
 * Hook to fetch and process cards.
 */
const useCards = () => {
  const [cards, setCards] = useState<
    (CardProps & { rarity: string; teacher: string })[]
  >([]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("/data/cards.json");
      const data = await res.json();
      setCards(data.cards);
    };
    fetchCards();
  }, []);

  return cards;
};

export default useCards;
