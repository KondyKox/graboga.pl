"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const GameModePage = () => {
  const params = useParams();
  const mode = params.mode; // Wyciągnięcie parametru 'mode' z URL

  // Dynamically import the appropriate game mode component based on 'mode'
  const GameModeComponent = dynamic(() => import(`../../../game_modes/${mode}`));

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <GameModeComponent />
    </div>
  );
};

export default GameModePage;
