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
    background: "/nig.png",
  },
  {
    name: "sala303",
    background: "/tworcy.png",
  },
  {
    name: "klasaPolski",
    background: "/donejtor.png",
  },
] as const;

export type Location = (typeof LOCATIONS)[number];
