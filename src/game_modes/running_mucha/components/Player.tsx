import Image from "next/image";
import { forwardRef } from "react";

const Player = forwardRef<
  HTMLDivElement,
  { isJumping: boolean; playerCol: string }
>(({ isJumping, playerCol }, ref) => (
  <div
    ref={ref}
    className={`absolute`}
    style={{
      left: "15rem",
      bottom: isJumping ? "150px" : "0px", // Skakanie zmienia bottom
      transition: "bottom 0.3s ease-out", // Płynna animacja
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
));

export default Player;
