import Card from "@/components/card/Card";
import CardProps from "@/types/CardProps";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import { useEffect, useRef } from "react";

const Obstacles = ({
  obstacles,
  cards,
  onUpdateDimensions,
}: {
  obstacles: Obstacle[];
  cards: CardProps[];
  onUpdateDimensions: (id: number, rect: DOMRect) => void;
}) => {
  const obstacleRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    obstacles.forEach((obs) => {
      const element = obstacleRefs.current.get(obs.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        onUpdateDimensions(obs.id, rect); // Aktualizujemy dynamiczne wymiary
      }
    });
  }, [obstacles]);

  return (
    <>
      {obstacles.map((obs) => (
        <div
          key={obs.id}
          style={{
            left: obs.left,
            bottom: 0,
            widows: obs.width,
            height: obs.height,
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
