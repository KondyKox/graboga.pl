// List of possible actions for Uno Cards
export const ACTIONS = [
  "normal",
  "skip",
  "draw",
  "reverse",
  "changeLocation",
] as const;
export type Action = (typeof ACTIONS)[number];

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
    name: "sala303",
    background: "/uno_mechan/locations/sala303.jpg",
  },
  {
    name: "klasaPolski",
    background: "/uno_mechan/locations/klasaPolski.jpg",
  },
  {
    name: "nagrobekMuchy",
    background: "/uno_mechan/locations/nagrobekMuchy.jpg",
  },
] as const;

export type Location = (typeof LOCATIONS)[number];
