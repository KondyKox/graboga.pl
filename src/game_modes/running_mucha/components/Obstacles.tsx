import Card from "@/components/card/Card";
import CardProps from "@/types/CardProps";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

const Obstacles = ({
  obstacles,
  setObstacles,
  cards,
  obstacleRefs,
  gameStarted,
  gameOver,
  score,
}: {
  obstacles: Obstacle[];
  setObstacles: Dispatch<SetStateAction<Obstacle[]>>;
  cards: CardProps[];
  obstacleRefs: MutableRefObject<Map<number, HTMLElement | null>>;
  gameStarted: boolean;
  gameOver: boolean;
  score: number;
}) => {
  let speed = 10;

  // Generate random obstacles
  const generateObstacles = (
    cards: CardProps[],
    setObstacles: Dispatch<SetStateAction<Obstacle[]>>
  ) => {
    if (cards.length === 0) return;

    const baseLeft = window.innerWidth;
    const newObstacles: Obstacle[] = [];

    setTimeout(() => {
      // Randomly decide if one or two obstacles
      const result = Math.random();
      const obstacleCount = result >= 0.8 ? 3 : result > 0.5 ? 2 : 1;

      for (let i = 0; i < obstacleCount; i++) {
        newObstacles.push({
          id: Date.now() + i,
          left: baseLeft + i * 120,
          cardIndex: Math.floor(Math.random() * cards.length),
          // width: 40,
          // height: 40,
        });
      }

      setObstacles((prev) => [...prev, ...newObstacles]);
    }, 3000);
  };

  // Move obstacles
  const moveObstacles = () => {
    setObstacles((prev) =>
      prev
        .map((obs) => ({ ...obs, left: obs.left - speed }))
        .filter((obs) => obs.left > -100)
    );
  };

  // Move & generate obstacles intervals
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      moveObstacles();
    }, 50);

    // Generate obstacles
    const obstacleGenInterval = setInterval(() => {
      generateObstacles(cards, setObstacles);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(obstacleGenInterval);
    };
  }, [gameStarted, gameOver]);

  // Increase speed
  useEffect(() => {
    if (score % 500 === 0) speed += 5;
  }, [score]);

  return (
    <>
      {obstacles.map((obs) => (
        <div
          key={obs.id}
          ref={(el) => {
            obstacleRefs.current.set(obs.id, el);
          }}
          style={{
            left: obs.left,
            bottom: "-10%",
            position: "absolute",
            transform: "scale(0.5)",
          }}
        >
          <Card card={cards[obs.cardIndex]} />
        </div>
      ))}
    </>
  );
};

export default Obstacles;
