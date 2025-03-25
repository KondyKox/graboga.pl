// Calculate player level
export const calculateLevel = (points: number | undefined) => {
  if (points == undefined)
    return {
      level: 0,
      remainingXP: 0,
      xpForNextLevel: 0,
    };

  const baseXP = 200; // Liczba punktów potrzebna do osiągnięcia 1 poziomu
  const multiplier = 1.13; // Mnożnik wzrostu punktów potrzebnych na kolejne poziomy

  let level = 0;
  let xpForNextLevel = baseXP;

  while (points >= xpForNextLevel) {
    points -= xpForNextLevel;
    level++;
    xpForNextLevel = Math.floor(baseXP * Math.pow(multiplier, level));
  }

  return {
    level: level,
    remainingXP: points,
    xpForNextLevel: xpForNextLevel,
  };
};
