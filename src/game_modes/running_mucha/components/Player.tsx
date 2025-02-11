import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

const Player = forwardRef<HTMLDivElement, { playerCol: string }>(
  ({ playerCol }, ref) => {
    const [isJumping, setIsJumping] = useState<boolean>(false);

    // Check keyboard input
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "w" || event.key === "ArrowUp")
        handleJump();
    };

    // Jumping on key down
    useEffect(() => {
      const keyPressHandler = (event: KeyboardEvent) => handleKeyPress(event);
      window.addEventListener("keydown", keyPressHandler);
      return () => window.removeEventListener("keydown", keyPressHandler);
    }, [isJumping]);

    // Jumping function
    const handleJump = () => {
      if (isJumping) return;
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 1000);
    };

    return (
      <div
        ref={ref}
        className="absolute"
        style={{
          left: "15rem",
          bottom: isJumping ? "300px" : "0px", // Skakanie zmienia bottom
          transition: "bottom 0.5s ease-out", // Płynna animacja
        }}
      >
        <Image
          src={`/running_mucha/player/${playerCol}/${
            isJumping ? "jump.png" : "run.png"
          }`}
          alt="Gracz"
          width={64}
          height={64}
        />
      </div>
    );
  }
);

export default Player;
