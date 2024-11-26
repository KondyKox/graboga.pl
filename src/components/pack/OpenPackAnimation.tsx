import useCards from "@/hooks/useCards";
import PackAnimationProps from "@/types/PackAnimationProps";
import { useEffect, useState } from "react";
import Card from "../card/Card";

const OpenPackAnimation: React.FC<PackAnimationProps> = ({
  duration,
  onFinish,
}) => {
  const cards = useCards();
  const [rolling, setRolling] = useState(true);

  // Rozszerzenie kart (po 2 kopie każdej)
  const doubledCards = [...cards, ...cards,];
  const shuffledCards = doubledCards.sort(() => 0.5 - Math.random()); // Przetasowanie

  useEffect(() => {
    if (shuffledCards.length === 0) return;

    const audio = new Audio("/sfx/spin.wav");
    audio.play();

    // Zakończenie animacji po określonym czasie
    const timer = setTimeout(() => {
      setRolling(false);
      onFinish();
    }, duration);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0; // Resetowanie dźwięku
    };
  }, [shuffledCards, duration, onFinish]);

  if (shuffledCards.length === 0) return null;

  return (
    <div className="overflow-hidden w-3/4 bg-transparent flex items-center justify-center">
      <div
        className={`flex gap-2 animate-rolling`}
        style={{
          animationDuration: `${Math.max(0.5, duration / 600)}s`, // Dostosowanie prędkości animacji
        }}
      >
        {shuffledCards.map((card, index) => (
          <div key={index} className="flex-shrink-0 rounded shadow-lg">
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenPackAnimation;
