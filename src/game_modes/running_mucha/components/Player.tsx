import Image from "next/image";

const Player = ({
  isJumping,
  playerCol,
  ref,
}: {
  isJumping: boolean;
  playerCol: string;
  ref: any;
}) => (
  <div ref={ref} className="absolute bottom-0 left-[200px]">
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

export default Player;
