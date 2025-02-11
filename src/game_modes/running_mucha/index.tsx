import LoadingOverlay from "@/components/Loading";
import useCards from "@/hooks/useCards";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Obstacles from "./components/Obstacles";
import Player from "./components/Player";
import { handleKeyPress, handleStartGame } from "./utils/gameUtils";
import { generateObstacles, moveObstacles } from "./utils/obstacleUtils";
import { checkCollision, handleJump } from "./utils/playerUtils";

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
  const obstacleRefs = useRef<Map<number, HTMLElement | null>>(new Map());

  // Show loading overlay
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Start game on click
  const startGame = () => {
    console.log("Game started.");

    handleStartGame(setGameStarted, setGameOver, setScore, setObstacles);
  };

  // Jumping on key down
  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) =>
      handleKeyPress(event, () => handleJump(isJumping, setIsJumping));
    window.addEventListener("keydown", keyPressHandler);
    return () => window.removeEventListener("keydown", keyPressHandler);
  }, [isJumping]);

  // Move obstacles
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      moveObstacles(setObstacles, setScore);
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

  // Check for collision
  useEffect(() => {
    if (!gameStarted || gameOver || !playerRef) return;
    checkCollision(obstacles, playerRef, obstacleRefs, setGameOver);
  }, [obstacles, gameStarted, gameOver, isJumping]);

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
          <Player isJumping={isJumping} playerCol={playerCol} ref={playerRef} />
          <Obstacles
            obstacles={obstacles}
            cards={cards}
            obstacleRefs={obstacleRefs}
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
