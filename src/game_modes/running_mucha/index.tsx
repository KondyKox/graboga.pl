import Card from "@/components/card/Card";
import useCards from "@/hooks/useCards";
import CardProps from "@/types/CardProps";
import Image from "next/image";
import { useEffect, useState } from "react";

const RunningMuchaMode = () => {
  const cards = useCards();
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [obstaclesPosition, setObstaclesPosition] = useState<number[]>([]);
  const [playerPos, setPlayerPos] = useState<number>(200);
  const [playerColor, setPlayerColor] = useState("white");
  const playerImg = `/running_mucha/player/${playerColor}`; // Path to player image

  // Jumping on key down
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "w" || event.key === "ArrowUp")
        handleJump();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isJumping]);

  // Start game on click
  const handleStartGame = () => {
    console.log("Game started.");
    setGameStarted(true);
    startGameLoop();
  };

  // Generate random obstacles
  const generateObstacles = () => {
    if (cards.length === 0) return;
    const randomObstacles = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * cards.length)
    );
    setObstaclesPosition(randomObstacles);
  };

  // Render obstacles
  const renderObstacles = () => {
    return obstaclesPosition.map((pos, index) => {
      const card = cards[pos];
      return (
        <div
          key={index}
          //   className="absolute"
          style={{
            scale: 0.35,
            left: `${pos * 150}px`, // Pozycja przeszkody na osi X
            bottom: "0px", // Pozycja na osi Y (na dole)
          }}
        >
          <Card card={card} />{" "}
        </div>
      );
    });
  };

  // Game loop
  const startGameLoop = () => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
      generateObstacles();

      const collision = obstaclesPosition.some((pos) => playerPos === pos);
      if (collision) {
        clearInterval(interval);
        setGameOver(true);
        console.log("Game Over");
      }
    }, 1000);
  };

  // Jumping
  const handleJump = () => {
    if (isJumping) return;

    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 500);
  };

  return (
    <div className="flex flex-col justify-center items-center relative overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <h2 className="sub-header">Running Mucha</h2>
        <p className="text-sm">
          Wynik: <span className="text-epic">{score}</span>
        </p>
      </div>
      {/* Start game screen */}
      {!gameStarted && (
        <div
          className="flex flex-col justify-center items-center w-full mt-8"
          onClick={handleStartGame}
        >
          <h2 className="sub-header">Kliknij, aby zacząć</h2>
          <Image
            src={`${playerImg}/idle.png`}
            alt="Gracz"
            width={64}
            height={64}
          />
        </div>
      )}

      {/* Game UI */}
      {gameStarted && !gameOver && (
        <div className="flex justify-center items-center">
          <Image
            src={`${playerImg}/${!isJumping ? "run.png" : "jump.png"}`}
            alt="Gracz"
            width={64}
            height={64}
          />
          {renderObstacles()}
        </div>
      )}

      {/* Game Over screen */}
      {gameOver && (
        <div className="flex justify-center items-center w-full mt-8">
          <h2 className="sub-header text-gradient">Przegrałeś frajerze!</h2>
        </div>
      )}
    </div>
  );
};

export default RunningMuchaMode;
