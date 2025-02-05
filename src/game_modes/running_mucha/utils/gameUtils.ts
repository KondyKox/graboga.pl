import Obstacle from "@/types/running_mucha/ObstacleProps";
import { Dispatch, SetStateAction } from "react";

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

export const handleKeyPress = (event: KeyboardEvent, handleJump: Function) => {
  if (event.key === " " || event.key === "w" || event.key === "ArrowUp") {
    handleJump();
  }
};
