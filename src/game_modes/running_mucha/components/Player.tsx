import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

const Player = forwardRef<HTMLDivElement, { playerCol: string }>(
  ({ playerCol }, ref) => {
    const [isJumping, setIsJumping] = useState<boolean>(false);
    const [bottom, setBottom] = useState<number>(0);
    const [posX, setPosX] = useState<number>(240); // 240px === 15rem
    const [transitionStyle, setTransitionStyle] = useState<string>("ease-out");
    const [isMirrored, setIsMirrored] = useState<boolean>(false);

    const posXSpeed = 10;
    const movementDirectionRef = useRef<"left" | "right" | null>(null);

    // Check keyboard input
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "w" || event.key === "ArrowUp")
        handleJump();
      if (event.key === "d" || event.key === "ArrowRight") {
        movementDirectionRef.current = "right";
        setIsMirrored(false);
      }
      if (event.key === "a" || event.key === "ArrowLeft") {
        movementDirectionRef.current = "left";
        setIsMirrored(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === "d" ||
        event.key === "ArrowRight" ||
        event.key === "a" ||
        event.key === "ArrowLeft"
      )
        movementDirectionRef.current = null;
    };

    // Movement on key down
    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    // Movement loop
    useEffect(() => {
      let animationFrameId: number;
      const move = () => {
        if (movementDirectionRef.current === "right")
          setPosX((prev) => prev + posXSpeed);
        if (movementDirectionRef.current === "left")
          setPosX((prev) => prev - posXSpeed);
        animationFrameId = requestAnimationFrame(move);
      };
      animationFrameId = requestAnimationFrame(move);

      return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Jumping function
    const handleJump = () => {
      if (isJumping) return;
      setIsJumping(true);
      setTransitionStyle("ease-out");
      setBottom(400);

      setTimeout(() => {
        setTransitionStyle("ease-in");
        setBottom(0);

        setTimeout(() => {
          setIsJumping(false);
        }, 500);
      }, 500);
    };

    return (
      <div
        ref={ref}
        className="absolute"
        style={{
          // left: `${posX}px`,
          transform: `translateX(${posX}px)`,
          bottom: `${bottom}px`, // Skakanie zmienia bottom
          transition: `bottom 0.5s ${transitionStyle}`, // Płynna animacja
        }}
      >
        <Image
          src={`/running_mucha/player/${playerCol}/${
            isJumping ? "jump.png" : "run.png"
          }`}
          style={{ transform: isMirrored ? "scaleX(-1)" : "scaleX(1)" }}
          alt="Gracz"
          width={64}
          height={64}
        />
      </div>
    );
  }
);

export default Player;
