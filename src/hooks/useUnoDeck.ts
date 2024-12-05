import { useState, useEffect } from "react";
import CardProps from "@/types/CardProps";
import { ACTIONS, LOCATIONS } from "@/game_modes/uno_mechan/constants";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";

/**
 * Zwraca losową akcję z listy dostępnych akcji.
 * @returns {string} Losowa akcja z tablicy ACTIONS.
 */
const getRandomAction = () =>
  ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

/**
 * Dodaje losowe akcje i lokacje do kart w talii.
 * @param {CardProps[]} cards Tablica podstawowych kart.
 * @returns {UnoCardProps[]} Tablica kart z dodatkowymi właściwościami (akcja i lokacja).
 */
const transformDeck = (cards: CardProps[]): UnoCardProps[] => {
  return cards.flatMap((card): UnoCardProps[] => {
    if (card.rarity === "legendary") {
      // Legendarne karty: bez lokalizacji, ale mają efekty
      return [
        {
          ...card,
          action: getRandomAction(), // Efekt dla legendarnych kart
          location: null, // Brak lokalizacji
        },
      ]; // Zwracamy tablicę z jedną kartą
    }

    if (card.rarity === "epic") {
      // Epickie karty: każda lokacja + efekty
      return LOCATIONS.map((location) => ({
        ...card,
        action: getRandomAction(), // Efekt dla epickich kart
        location: location.name, // Lokacja
      }));
    }

    // Zwykłe karty: każda lokacja, bez efektów
    return LOCATIONS.map((location) => ({
      ...card,
      action: null, // Brak efektu
      location: location.name, // Lokacja
    }));
  });
};

/**
 * Przetasowuje elementy w podanej tablicy za pomocą algorytmu Fisher-Yates Shuffle.
 * @template T Typ elementów w tablicy.
 * @param {T[]} array Tablica do przetasowania.
 * @returns {T[]} Przetasowana tablica.
 */
const shuffleDeck = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Hook do zarządzania talią kart UNO.
 * - Pobiera dane kart z pliku JSON.
 * - Dodaje losowe akcje i lokacje do kart.
 * - Przetasowuje talię.
 * @returns {{ deck: UnoCardProps[], loading: boolean }}
 * - `deck`: Przetasowana talia kart.
 * - `loading`: Stan ładowania talii.
 */
const useUnoDeck = () => {
  const [deck, setDeck] = useState<UnoCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Pobiera dane kart z pliku JSON, przekształca je i tasuje.
     * @async
     */
    const fetchDeck = async () => {
      try {
        const response = await fetch("/data/cards.json");
        const data: CardProps[] = await response.json();
        if (!Array.isArray(data))
          throw new Error("Fetched data is not an array!");

        const transformedDeck = transformDeck(data);
        const shuffledDeck = shuffleDeck(transformedDeck);

        console.log("Deck fetched and shuffled:", shuffledDeck);
        setDeck(shuffledDeck);
      } catch (error) {
        console.error("Error fetching deck:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, []);

  return { deck, loading };
};

export default useUnoDeck;
