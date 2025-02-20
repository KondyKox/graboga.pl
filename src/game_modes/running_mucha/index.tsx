import LoadingOverlay from "@/components/Loading";
import useCards from "@/hooks/useCards";
import Obstacle from "@/types/running_mucha/ObstacleProps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Obstacles from "./components/Obstacles";
import Player from "./components/Player";
import { checkCollision, handleStartGame } from "./utils/gameUtils";
import { Location, LOCATIONS } from "../locations";

const playerColKey =
  process.env.NEXT_PUBLIC_PLAYER_COLOR_KEY || "GRABOGA_PLAYER_COLOR"; // Local storage key

const RunningMuchaMode = () => {
  const cards = useCards();
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [location, setLocation] = useState<Location>(LOCATIONS[0]);
  const [fade, setFade] = useState<boolean>(false);

  const playerCol = localStorage.getItem(playerColKey) || "white";

  // Object references
  const playerRef = useRef<HTMLDivElement>(null);
  const obstacleRefs = useRef<Map<number, HTMLElement | null>>(new Map());

  // Music
  const gameMusicRef = useRef<HTMLAudioElement | null>(null);
  const loseMusicRef = useRef<HTMLAudioElement | null>(null);

  // Show loading overlay
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Change background
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setLocation((prev) => {
          const currentIndex = LOCATIONS.findIndex(
            (loc) => loc.name === prev.name
          );
          const nextIndex = (currentIndex + 1) % LOCATIONS.length;
          return LOCATIONS[nextIndex];
        });
        setFade(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Play music
  useEffect(() => {
    if (!gameMusicRef.current) {
      gameMusicRef.current = new Audio("/sfx/running_mucha/game.mp3");
      gameMusicRef.current.loop = true;
      gameMusicRef.current.volume = 0.5;
    }
    if (!loseMusicRef.current) {
      loseMusicRef.current = new Audio("/sfx/running_mucha/lose.wav");
      gameMusicRef.current.volume = 0.7;
    }

    if (gameStarted) gameMusicRef.current?.play();
    else {
      gameMusicRef.current?.pause();
      gameMusicRef.current!.currentTime = 0;
    }

    if (gameOver) {
      gameMusicRef.current?.pause();
      gameMusicRef.current!.currentTime = 0;
      loseMusicRef.current?.play();
    }
  }, [gameStarted, gameOver]);

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
      className={`flex flex-col justify-center items-center gap-4 relative overflow-hidden w-full transition-opacity duration-300 ease-in-out ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      style={{
        height: "calc(100vh - 100px)",
        backgroundImage: `url(${location.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="header text-gradient">Running Mucha</h2>
        <p className="text-lg font-bold">
          Wynik: <span className="text-epic">{score}</span>
        </p>
      </div>

      {/* Start game screen */}
      {!gameStarted && !gameOver && (
        <div
          className="flex flex-col items-center justify-center gap-4 w-full h-full"
          onClick={startGame}
        >
          <h2 className="sub-header text-cursed text-stroke">
            Kliknij, aby zacząć
          </h2>
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
            score={score}
          />
        </div>
      )}

      {/* Game Over screen */}
      {gameOver && (
        <div className="flex flex-col items-center">
          <h2 className="sub-header text-cursed text-stroke">Game Over</h2>
          <button onClick={startGame} className="btn px-6 bg-rare">
            Zagraj ponownie
          </button>
        </div>
      )}
    </div>
  );
};

export default RunningMuchaMode;
