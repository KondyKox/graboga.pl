import Card from "@/components/card/Card";
import LoadingOverlay from "@/components/Loading";
import useCards from "@/hooks/useCards";
import Image from "next/image";
import { useEffect, useState } from "react";

const RunningMuchaMode = () => {
  const cards = useCards();
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<
    { id: number; left: number; cardIndex: number }[]
  >([]);
  const [playerColor, setPlayerColor] = useState("white");
  const playerImg = `/running_mucha/player/${playerColor}`; // Path to player image

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
  };

  // Generate random obstacles
  const generateObstacles = () => {
    if (cards.length === 0) return;

    const newObstacles: { id: number; left: number; cardIndex: number }[] = [];
    const baseLeft = 1000;

    // Random number of obstacles
    const numObstacles = Math.random() > 0.5 ? 1 : 2;

    for (let i = 0; i < numObstacles; i++) {
      newObstacles.push({
        id: Date.now() + i, // Unikalny ID
        left: baseLeft + i * 50, // Pozycja przeszkód w grupie
        cardIndex: Math.floor(Math.random() * cards.length), // Losowa karta
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
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    // Update score
    setScore((prevScore) => prevScore + 1);

    const playerBox = {
      left: 200,
      right: 260,
      bottom: 0,
      top: isJumping ? 150 : 100,
    };

    const collision = obstacles.some((obs) => {
      const obstacleBox = {
        left: obs.left,
        right: obs.left + 50,
        bottom: 0,
        top: 100,
      };
      return (
        playerBox.right > obstacleBox.left &&
        playerBox.left < obstacleBox.right &&
        playerBox.bottom < obstacleBox.top
      );
    });

    if (collision) {
      setGameOver(true);
      console.log("Game Over");
    }
  }, [obstacles, isJumping, gameStarted, gameOver]);

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
    <div className="flex flex-col justify-center items-center gap-4 relative overflow-hidden h-screen w-screen">
      <div className="flex flex-col justify-center items-center">
        <h2 className="sub-header">Running Mucha</h2>
        <p className="text-sm">
          Wynik: <span className="text-epic">{score}</span>
        </p>
      </div>
      {/* Start game screen */}
      {!gameStarted && (
        <div
          className="flex flex-col justify-center items-center w-full"
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
        <div className="relative w-full h-full">
          <div
            className={`absolute bottom-0 left-200 ${
              isJumping ? "animate-jump" : ""
            }`}
          >
            <Image
              src={`${playerImg}/${!isJumping ? "run.png" : "jump.png"}`}
              alt="Gracz"
              width={64}
              height={64}
            />
          </div>
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              style={{
                left: obs.left,
                bottom: 0,
                position: "absolute",
                scale: 0.35,
              }}
            >
              <Card card={cards[obs.cardIndex]} />
            </div>
          ))}
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
