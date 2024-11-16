"use client";

import Card from "@/components/Card";
import UnoCardProps from "@/types/UnoCardProps";
import { useEffect, useState } from "react";

// Fetch all cards from cards.json
const fetchDeck = async (): Promise<UnoCardProps[]> => {
  const response = await fetch("/data/cards.json");
  const data: UnoCardProps[] = await response.json();
  return data;
};

const UnoGame = () => {
  // Inicjalizacja stanu gry
  const [deck, setDeck] = useState<UnoCardProps[]>([]);
  const [isTurn, setIsTurn] = useState<boolean>(true); // Czy to tura gracza?
  const [playerCards, setPlayerCards] = useState<UnoCardProps[]>(
    deck.slice(0, 7)
  ); // Gracz ma 7 kart
  const [currentCard, setCurrentCard] = useState<UnoCardProps>(
    {} as UnoCardProps
  ); // Karta na stole

  // Załadowanie kart z JSON
  useEffect(() => {
    const loadDeck = async () => {
      const newDeck = await fetchDeck(); // Pobieramy karty
      setDeck(newDeck);
      setPlayerCards(newDeck.slice(0, 7)); // Gracz otrzymuje 7 kart
      setCurrentCard(newDeck[Math.floor(Math.random() * newDeck.length)]); // Losowanie karty na stole
    };

    loadDeck();
  }, []);

  return (
    <div>
      <div>
        <h3>Aktualna Karta</h3>
        <Card card={currentCard} />
        <h3>Twoje Karty</h3>
        <div>
          {playerCards.map((card) => (
            <Card
              key={card.id}
              card={card} /* onClick={() => playCard(card)} */
            />
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
