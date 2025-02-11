import Obstacle from "@/types/running_mucha/ObstacleProps";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

// Start game function
export const handleStartGame = (
  setGameStarted: Dispatch<SetStateAction<boolean>>,
  setGameOver: Dispatch<SetStateAction<boolean>>,
  setScore: Dispatch<SetStateAction<number>>,
  setObstacles: Dispatch<SetStateAction<Obstacle[]>>
) => {
  setGameStarted(true);
  setGameOver(false);
  setScore(0);
  setObstacles([]);
};

// Check collision between player and obstacles
export const checkCollision = (
  obstacles: Obstacle[],
  playerRef: MutableRefObject<HTMLElement | null>,
  obstacleRefs: MutableRefObject<Map<number, HTMLElement | null>>,
  setGameOver: Dispatch<SetStateAction<boolean>>
) => {
  const playerBox = playerRef.current?.getBoundingClientRect();

  const collision = obstacles.some((obs) => {
    const obstacleElement = obstacleRefs.current.get(obs.id);
    if (!obstacleElement) return false;

    const obstacleBox = obstacleElement.getBoundingClientRect();

    return (
      playerBox &&
      playerBox.right > obstacleBox.left &&
      playerBox.left < obstacleBox.right &&
      playerBox.bottom > obstacleBox.top &&
      playerBox.top < obstacleBox.bottom
    );
  });

  if (collision) {
    setGameOver(true);
    console.log("Game Over");
  }
};
