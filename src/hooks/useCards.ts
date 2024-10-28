import CardProps from "@/types/CardProps";
import { useEffect, useState } from "react";

/**
 * Hook to get all info cards.
 * Returns cards as a table.
 */

const useCards = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    fetch("/data/cards.json")
      .then((response) => response.json())
      .then((data) => {
        const flattenedCards = Object.entries(data.cards).flatMap(
          ([rarity, cards]) =>
            (cards as CardProps[]).map((card) => ({ ...card, rarity }))
        );
        setCards(flattenedCards);
      })
      .catch((error) => console.error("Error loading cards:", error));
  }, []);

  return cards;
};

export default useCards;
