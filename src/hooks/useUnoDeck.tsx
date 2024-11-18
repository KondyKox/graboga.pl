import { useState, useEffect } from "react";
import UnoCardProps from "@/types/UnoCardProps";
import CardProps from "@/types/CardProps";
import { ACTIONS, LOCATIONS } from "@/game_modes/uno_mechan/constants";

/**
 * Przetasowuje elementy w podanej tablicy za pomocą algorytmu Fisher-Yates Shuffle.
 * @template T Typ elementów w tablicy.
 * @param {T[]} array Tablica do przetasowania.
 * @returns {T[]} Przetasowana tablica.
 */
const shuffleDeck = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Zwraca losową akcję z listy dostępnych akcji.
 * @returns {string} Losowa akcja z tablicy ACTIONS.
 */
const getRandomAction = () =>
  ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

/**
 * Zwraca losową lokację z listy dostępnych lokacji.
 * @returns {Location} Losowa lokacja z tablicy LOCATIONS.
 */
const getRandomLocation = () =>
  LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

/**
 * Dodaje losowe akcje i lokacje do kart w talii.
 * @param {CardProps[]} cards Tablica podstawowych kart.
 * @returns {UnoCardProps[]} Tablica kart z dodatkowymi właściwościami (akcja i lokacja).
 */
const transformDeck = (cards: CardProps[]): UnoCardProps[] =>
  cards.map((card) => ({
    ...card,
    action: getRandomAction(),
    location: getRandomLocation().name,
  }));

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
