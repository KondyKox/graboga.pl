// List of possible actions for Uno Cards
export const ACTIONS = {
  epic: ["block", "reverse", "+2"],
  legendary: ["+4", "reverse & +2"],
  cursed: ["draw"],
} as const;
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS][number];
