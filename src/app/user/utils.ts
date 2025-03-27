import CardProps from "@/types/CardProps";
import ProfileData from "@/types/ProfileProps";
import { CARD_GABLOTS } from "./constants";

// Calculate player level
export const calculateLevel = (points: number | undefined) => {
  if (points == undefined)
    return {
      level: 0,
      remainingXP: 0,
      xpForNextLevel: 0,
    };

  const baseXP = 200; // Liczba punktów potrzebna do osiągnięcia 1 poziomu
  const multiplier = 1.13; // Mnożnik wzrostu punktów potrzebnych na kolejne poziomy

  let level = 0;
  let xpForNextLevel = baseXP;

  while (points >= xpForNextLevel) {
    points -= xpForNextLevel;
    level++;
    xpForNextLevel = Math.floor(baseXP * Math.pow(multiplier, level));
  }

  return {
    level: level,
    remainingXP: points,
    xpForNextLevel: xpForNextLevel,
  };
};

// Feature a card to a gablot on profile
export const featureCard = (
  profile: ProfileData,
  card: CardProps,
  setTestCards: React.Dispatch<React.SetStateAction<CardProps[]>>,
  testCards: CardProps[],
  currentCard: CardProps | null
) => {
  const featuredCards = /* profile.featuredCards */ testCards || [];
  if (featuredCards.length >= CARD_GABLOTS) return;

  // Replace current card with new one
  let updatedCards = [...featuredCards];
  if (currentCard)
    updatedCards = updatedCards.filter((c) => c.id !== currentCard.id);
  // profile.featuredCards = featuredCards.filter(
  //   (c) => c.id !== currentCard.id
  // );

  updatedCards.push(card);
  setTestCards(updatedCards);

  // profile.featuredCards.push(card);
  console.log("Card featured!");
};
