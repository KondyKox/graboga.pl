import { useEffect, useState } from "react";
import Card from "../card/Card";
import CardProps from "@/types/CardProps";
import OpenPackAnimation from "./OpenPackAnimation";

const playSound = (rarity: string) => {
  const audio = new Audio(`/sfx/${rarity}.wav`);
  audio.play();
};

export default function OpenPack({ packData, onClose }: any) {
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [animationFinished, setAnimationFinished] = useState(false); // Kontroluje zakończenie animacji

  // Zaczynamy sekwencję wyświetlania kart po zakończeniu animacji
  useEffect(() => {
    if (!animationFinished || !packData || packData.length === 0) return;

    let timer: NodeJS.Timeout;

    // Wyświetl pierwszą kartę po 1 sekundzie
    if (currentCardIndex === -1) {
      timer = setTimeout(() => {
        setCurrentCardIndex(0); // Pokaż pierwszą kartę
        playSound(packData[0].rarity); // Odtwórz dźwięk dla pierwszej karty
      }, 1000);
    } else {
      // Wyświetlaj kolejne karty co 2 sekundy
      timer = setTimeout(() => {
        setCurrentCardIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < packData.length) {
            playSound(packData[nextIndex].rarity); // Odtwórz dźwięk dla kolejnej karty
            return nextIndex;
          }
          return prevIndex; // Zatrzymaj na ostatniej karcie
        });
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [animationFinished, currentCardIndex, packData]);

  // Zakończ animację
  const handleAnimationFinish = () => {
    setAnimationFinished(true);
  };

  if (!packData || packData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <OpenPackAnimation duration={7000} onFinish={handleAnimationFinish} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 bg-opacity-80 flex flex-col justify-center items-center gap-6">
      {!animationFinished ? (
        <OpenPackAnimation duration={7000} onFinish={handleAnimationFinish} />
      ) : (
        // Kontener z przewijaniem
        <div className="w-full max-w-3xl overflow-x-auto">
          <div className="flex items-center justify-start md:justify-center gap-4 p-4">
            {packData.map((card: CardProps, index: number) => (
              <div
                key={index}
                className={`transition-all duration-700 hover:-translate-y-2 ${
                  currentCardIndex >= index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        className="btn w-1/2 lg:w-1/3 bg-rare border-none"
        onClick={onClose}
      >
        Zbierz karty
      </button>
    </div>
  );
}
