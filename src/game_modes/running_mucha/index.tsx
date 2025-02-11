import LoadingOverlay from "@/components/Loading";
import useCards from "@/hooks/useCards";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Obstacles from "./components/Obstacles";
import Player from "./components/Player";
import { checkCollision, handleStartGame } from "./utils/gameUtils";

const RunningMuchaMode = () => {
  const cards = useCards();
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [playerCol, setPlayerColor] = useState("white");

  const playerRef = useRef<HTMLDivElement>(null);
  const obstacleRefs = useRef<Map<number, HTMLElement | null>>(new Map());

  // Show loading overlay
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Update score
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Start game on click
  const startGame = () => {
    console.log("Game started.");

    handleStartGame(setGameStarted, setGameOver, setScore, setObstacles);
  };

  // Check for collision
  useEffect(() => {
    if (!gameStarted || gameOver || !playerRef) return;
    checkCollision(obstacles, playerRef, obstacleRefs, setGameOver);
  }, [obstacles, gameStarted, gameOver]);

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
          onClick={startGame}
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
          <Player playerCol={playerCol} ref={playerRef} />
          <Obstacles
            obstacles={obstacles}
            setObstacles={setObstacles}
            cards={cards}
            obstacleRefs={obstacleRefs}
            gameStarted={gameStarted}
            gameOver={gameOver}
          />
        </div>
      )}

      {/* Game Over screen */}
      {gameOver && (
        <div className="flex flex-col items-center">
          <h2 className="sub-header text-gradient">Game Over</h2>
          <button onClick={startGame} className="btn px-6">
            Zagraj ponownie
          </button>
        </div>
      )}
    </div>
  );
};

export default RunningMuchaMode;
