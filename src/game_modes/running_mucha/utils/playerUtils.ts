import Obstacle from "@/types/running_mucha/ObstacleProps";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

// Jumping function
export const handleJump = (
  isOnGround: boolean,
  setIsOnGround: Dispatch<SetStateAction<boolean>>,
  setIsJumping: Dispatch<SetStateAction<boolean>>
) => {
  if (!isOnGround) return;
  setIsOnGround(false);
  setIsJumping(true);
  setTimeout(() => {
    setIsJumping(false);
    setIsOnGround(true);
  }, 500);
};

// Check collision between player and obstacles
export const checkCollision = (
  obstacles: Obstacle[],
  playerRef: MutableRefObject<HTMLElement | null>,
  setGameOver: Dispatch<SetStateAction<boolean>>
) => {
  const playerBox = playerRef.current?.getBoundingClientRect();

  const collision = obstacles.some((obs) => {
    const obstacleBox = {
      left: obs.left,
      right: obs.left + obs.width,
      bottom: window.innerHeight,
      top: window.innerHeight - obs.height,
    };

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
