"use client";

import Card from "@/components/Card";
import UnoCardProps from "@/types/UnoCardProps";
import { useEffect, useState } from "react";
import { Action, ACTIONS, Location, LOCATIONS } from "./constants";
import CardProps from "@/types/CardProps";

// Fetch all cards from cards.json
const fetchDeck = async (): Promise<UnoCardProps[]> => {
  const response = await fetch("/data/cards.json");
  const data: UnoCardProps[] = await response.json();
  if (!Array.isArray(data)) throw new Error("Fetched data is not an array!");
  return data;
};

// Random effect for uno card
// Funkcja losująca akcję
const getRandomAction = (): Action => {
  return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
};

// Random location for uno card
const getRandomLocation = (): Location => {
  return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
};

const transformDeck = (cards: CardProps[]): UnoCardProps[] =>
  cards.map((card) => ({
    ...card,
    action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
    location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)].name,
  }));

const UnoGame = () => {
  const [deck, setDeck] = useState<UnoCardProps[]>([]);
  const [playerCards, setPlayerCards] = useState<UnoCardProps[]>([]);
  const [currentCard, setCurrentCard] = useState<UnoCardProps>(
    {} as UnoCardProps
  );
  const [isTurn, setIsTurn] = useState<boolean>(true);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const newDeck = await fetchDeck();
        setDeck(newDeck);
        console.log(`Deck: ${deck}`);

        // Ustawienie kart gracza i karty na stole
        setPlayerCards(newDeck.slice(0, 7));
        setCurrentCard(newDeck[Math.floor(Math.random() * newDeck.length)]);
      } catch (error) {
        console.error("Failed to fetch deck:", error);
      }
    };

    loadDeck();
  }, []);

  return (
    <div>
      <div>
        <h3>Aktualna Karta</h3>
        {currentCard && <Card card={currentCard} />}
        <h3>Twoje Karty</h3>
        <div>
          {playerCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

        {/* <button onClick={drawCard} disabled={!isTurn}>
          Dobierz Kartę
        </button> */}

        <div>{!isTurn && <p>Teraz tura przeciwnika...</p>}</div>
      </div>
    </div>
  );
};

export default UnoGame;
