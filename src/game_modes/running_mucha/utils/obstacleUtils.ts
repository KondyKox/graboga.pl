import CardProps from "@/types/CardProps";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import { Dispatch, SetStateAction } from "react";

// Generate random obstacles
export const generateObstacles = (
  cards: CardProps[],
  obstacles: Obstacle[],
  setObstacles: Dispatch<SetStateAction<Obstacle[]>>
) => {
  if (cards.length === 0) return;

  const baseLeft = window.innerWidth;
  const newObstacles: Obstacle[] = [];

  setTimeout(() => {
    // Randomly decide if one or two obstacles
    const obstacleCount = Math.random() > 0.7 ? 2 : 1;

    for (let i = 0; i < obstacleCount; i++) {
      newObstacles.push({
        id: Date.now() + i,
        left: baseLeft + i * 60,
        cardIndex: Math.floor(Math.random() * cards.length),
        width: 40,
        height: 40,
      });
    }

    setObstacles((prev) => [...prev, ...newObstacles]);
  }, 3000);
};

// Move obstacles
export const moveObstacles = (
  setObstacles: Dispatch<SetStateAction<Obstacle[]>>,
  setScore: Dispatch<SetStateAction<number>>
) => {
  setObstacles((prev) =>
    prev
      .map((obs) => ({ ...obs, left: obs.left - 10 }))
      .filter((obs) => obs.left > -100)
  );

  setScore((prev) => prev + 1);
};
