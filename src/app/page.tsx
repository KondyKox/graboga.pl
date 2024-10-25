"use client";

import Card from "@/components/Card";
import CardProps from "@/types/CardProps";
import { useEffect, useState } from "react";

export default function Home() {
  // Testowanie jak karty wyglądają
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

  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
