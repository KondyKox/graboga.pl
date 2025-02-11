import Card from "@/components/card/Card";
import CardProps from "@/types/CardProps";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import { MutableRefObject } from "react";

const Obstacles = ({
  obstacles,
  cards,
  obstacleRefs,
}: {
  obstacles: Obstacle[];
  cards: CardProps[];
  obstacleRefs: MutableRefObject<Map<number, HTMLElement | null>>;
}) => {
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
