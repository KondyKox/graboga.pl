"use client";

import { Skin } from "@/types/running_mucha/SkinsProps";
import Image from "next/image";
import { useEffect, useState } from "react";

const playerColKey =
  process.env.NEXT_PUBLIC_PLAYER_COLOR_KEY || "GRABOGA_PLAYER_COLOR"; // Local storage key

const imageNames = ["jump.png", "idle.png", "run.png"]; // Skin image names

const RunningMuchaStore = () => {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [currentPlayerCol, setCurrentPlayerCol] = useState<string>(
    localStorage.getItem(playerColKey) || "white"
  );

  useEffect(() => {
    const fetchSkins = async () => {
      const response = await fetch("/data/skins.json");
      const data: Skin[] = await response.json();
      setSkins(data);
    };

    fetchSkins();
  }, []);

  // Handle click on skin (select / buy)
  const handleSkinClick = (skinId: string) => {
    localStorage.setItem(playerColKey, skinId);
    setCurrentPlayerCol(skinId);
  };

  return (
    <div className="flex flex-col border-b-2 p-4 rounded-lg w-full">
      <h3 className="sub-header text-legendary">Skiny</h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
        {skins.map((skin) => (
          <div
            key={skin.id}
            onClick={() => handleSkinClick(skin.id)}
            className={`flex flex-col items-center justify-center cursor-pointer gap-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-epic p-2 ${
              currentPlayerCol === skin.id && "bg-rare"
            }`}
          >
            <h4 className="font-bold tracking-widest text-lg">{skin.name}</h4>
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex justify-center items-center">
                {imageNames.map((imageName, index) => (
                  <Image
                    key={index}
                    src={`${skin.image}${imageName}`}
                    alt={skin.name}
                    width={64}
                    height={64}
                  />
                ))}
              </div>
              <div className="flex justify-center items-center gap-2 w-full border-t-2 rounded p-2">
                <p className="text-cursed">{skin.price}</p>{" "}
                <Image
                  src="/boski_dukat.png"
                  alt="Boski Dukat"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningMuchaStore;
