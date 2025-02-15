/* 
    List of possible locations for games.
    (locations replace colors in this edition) 
*/
export const LOCATIONS = [
  {
    name: "szatnia",
    background: "/locations/szatnia.jpg",
  },
  {
    name: "sala_303",
    background: "/locations/sala303.jpg",
  },
  {
    name: "klasa_polski",
    background: "/locations/klasaPolski.jpg",
  },
  {
    name: "nagrobek_muchy",
    background: "/locations/nagrobekMuchy.jpg",
  },
] as const;

export type Location = (typeof LOCATIONS)[number];
