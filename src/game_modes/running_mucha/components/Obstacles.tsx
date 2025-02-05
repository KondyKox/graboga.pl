import Card from "@/components/card/Card";
import CardProps from "@/types/CardProps";
import Obstacle from "@/types/running_mucha/ObstacleProps";

const Obstacles = ({
  obstacles,
  cards,
}: {
  obstacles: Obstacle[];
  cards: CardProps[];
}) => {
  return (
    <>
      {obstacles.map((obs) => (
        <div
          key={obs.id}
          style={{
            left: obs.left,
            bottom: "0px",
            width: obs.width,
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
