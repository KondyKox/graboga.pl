// List of possible actions for Uno Cards
export const ACTIONS = {
  epic: ["block", "reverse", "+2"],
  legendary: ["+4", "reverse & +2"],
  cursed: ["draw"],
} as const;
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS][number];

/* 
    List of possible locations for UNO Mechan.
    (locations replace colors in this edition) 
*/
export const LOCATIONS = [
  {
    name: "szatnia",
    background: "/uno_mechan/locations/szatnia.jpg",
  },
  {
    name: "sala_303",
    background: "/uno_mechan/locations/sala303.jpg",
  },
  {
    name: "klasa_polski",
    background: "/uno_mechan/locations/klasaPolski.jpg",
  },
  {
    name: "nagrobek_muchy",
    background: "/uno_mechan/locations/nagrobekMuchy.jpg",
  },
] as const;

export type Location = (typeof LOCATIONS)[number];
