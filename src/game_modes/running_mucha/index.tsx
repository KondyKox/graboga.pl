import LoadingOverlay from "@/components/Loading";
import useCards from "@/hooks/useCards";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Obstacles from "./components/Obstacles";
import Player from "./components/Player";

const RunningMuchaMode = () => {
  const cards = useCards();
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [playerCol, setPlayerColor] = useState("white");
  const playerRef = useRef<HTMLDivElement>(null);

  // Show loading overlay
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

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
    setGameOver(false);
    setScore(0);
    setObstacles([]);
  };

  // Generate random obstacles
  const generateObstacles = () => {
    if (cards.length === 0) return;

    const baseLeft = window.innerWidth;
    const newObstacles: Obstacle[] = [];

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
  };

  // Move obstacles
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, left: obs.left - 10 }))
          .filter((obs) => obs.left > -100)
      );

      // Losowe generowanie przeszkód
      if (Math.random() > 0.9) generateObstacles();
      setScore((prev) => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Dodaj dynamiczne wymiary przeszkód
  const handleUpdateObstacleDimensions = (id: number, rect: DOMRect) => {
    setObstacles((prev) =>
      prev.map((obs) =>
        obs.id === id ? { ...obs, width: rect.width, height: rect.height } : obs
      )
    );
  };

  // Check for collision
  useEffect(() => {
    if (!gameStarted || gameOver || !playerRef) return;

    const playerBox = playerRef.current?.getBoundingClientRect();

    const collision = obstacles.some((obs) => {
      const obstacleBox = {
        left: obs.left,
        right: obs.left + obs.width,
        bottom: 0,
        top: obs.height,
      };

      return (
        playerBox &&
        playerBox.right > obstacleBox.left &&
        playerBox.left < obstacleBox.right &&
        playerBox.bottom < obstacleBox.top &&
        playerBox.top > obstacleBox.bottom
      );
    });

    if (collision) {
      setGameOver(true);
      console.log("Game Over");
    }
  }, [obstacles, gameStarted, gameOver, isJumping]);

  // Jumping
  const handleJump = () => {
    if (isJumping) return;

    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 500);
  };

  if (loading) return <LoadingOverlay message="Running Mucha" />; // Loading Overlay

  return (
    <div
      className="flex flex-col justify-center items-center gap-4 relative overflow-hidden w-full"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="header">Running Mucha</h2>
        <p className="text-sm">
          Wynik: <span className="text-epic">{score}</span>
        </p>
      </div>
      {/* Start game screen */}
      {!gameStarted && !gameOver && (
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          onClick={handleStartGame}
        >
          <h2 className="sub-header text-cursed">Kliknij, aby zacząć</h2>
          <Image
            src={`/running_mucha/player/${playerCol}/idle.png`}
            alt="Gracz"
            width={64}
            height={64}
          />
        </div>
      )}

      {/* Game UI */}
      {gameStarted && !gameOver && (
        <div className="w-full h-full relative">
          <Player isJumping={isJumping} playerCol={playerCol} ref={playerRef} />
          <Obstacles
            obstacles={obstacles}
            cards={cards}
            onUpdateDimensions={handleUpdateObstacleDimensions}
          />
        </div>
      )}

      {/* Game Over screen */}
      {gameOver && (
        <div className="flex flex-col items-center">
          <h2 className="sub-header text-gradient">Game Over</h2>
          <button onClick={handleStartGame} className="btn px-6">
            Zagraj ponownie
          </button>
        </div>
      )}
    </div>
  );
};

export default RunningMuchaMode;
