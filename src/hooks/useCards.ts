import CardProps from "@/types/CardProps";
import { useEffect, useState } from "react";

/**
 * Hook to fetch and process cards.
 */
const useCards = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("/data/cards.json");
      const data = await res.json();
      setCards(data);
    };
    fetchCards();
  }, []);

  return cards;
};

export default useCards;
