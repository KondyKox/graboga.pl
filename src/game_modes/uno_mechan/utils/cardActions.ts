import UnoGameState from "@/types/uno_mechan/UnoGameState";
import UnoCardProps from "@/types/uno_mechan/UnoCardProps";
import { Action } from "../constants";
import { changeTurn } from "./utils";

// Draw card from deck
export const drawCardFromDeck = ({
  deck,
  setGameState,
}: {
  deck: UnoCardProps[];
  setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
}) => {
  if (deck.length === 0) return;

  const randomIndex = Math.floor(Math.random() * deck.length);
  const newCard = deck[randomIndex];

  setGameState((prevState) => ({
    ...prevState,
    players: prevState.players.map((player, index) =>
      index === prevState.currentPlayerIndex
        ? { ...player, cards: [...player.cards, newCard] }
        : player
    ),
  }));
};

// Execute action method
export const executeAction = (
  action: Action,
  params: {
    setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
    gameState: UnoGameState;
    deck: UnoCardProps[];
    drawCard: () => void;
    isClockwise: boolean;
    setIsClockwise: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const method = actionMethods[action];
  if (method) {
    console.log(`Executing action: ${action}`);
    method(params);
  } else console.log(`No action defined for ${action}`);
};

// Action methods
const actionMethods: Record<
  Action,
  (params: {
    setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
    gameState: UnoGameState;
    deck: UnoCardProps[];
    isClockwise: boolean;
    setIsClockwise: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void
> = {
  // Block action
  block: ({ setGameState, isClockwise }) => {
    console.log("Player blocked");
    const direction = isClockwise ? 1 : -1;

    // Change turn skipping 1 player (because he's blocked)
    setGameState((prevState) => ({
      ...prevState,
      currentPlayerIndex:
        (prevState.currentPlayerIndex + direction + prevState.players.length) %
        prevState.players.length,
    }));
    changeTurn({ setGameState, isClockwise });
  },
  // Draw card action
  draw: ({ setGameState, deck, isClockwise }) => {
    console.log("Player draws a card");

    drawCardFromDeck({ deck, setGameState });
    changeTurn({ setGameState, isClockwise });
  },
  // Reverse action
  reverse: ({ setGameState, setIsClockwise, isClockwise }) => {
    console.log("Turn reversed");

    setIsClockwise(!isClockwise);
    changeTurn({ setGameState, isClockwise });
  },
  // Reverse game direction & next player draw 2 cards
  "reverse & +2": ({ setGameState, deck, isClockwise, setIsClockwise }) => {
    console.log("Turn reversed & next player draws 2 cards");
    setIsClockwise(!isClockwise);

    // Next player draws 2 cards
    handleDrawCardAction({ setGameState, isClockwise, deck, cards: 2 });
  },

  // Next player draws 2 cards
  "+2": ({ setGameState, deck, isClockwise }) => {
    console.log("Next player draws 2 cards");

    // Next player draws 2 cards
    handleDrawCardAction({ setGameState, isClockwise, deck, cards: 2 });
  },
  // Next player draws 4 cards
  "+4": ({ setGameState, deck, isClockwise }) => {
    console.log("Next player draws 4 cards");

    // Next player draws 4 cards
    handleDrawCardAction({ setGameState, isClockwise, deck, cards: 4 });
  },
};

// Draw card action handler
const handleDrawCardAction = ({
  setGameState,
  isClockwise,
  deck,
  cards,
}: {
  setGameState: React.Dispatch<React.SetStateAction<UnoGameState>>;
  isClockwise: boolean;
  deck: UnoCardProps[];
  cards: number;
}) => {
  changeTurn({ setGameState, isClockwise });
  for (let i = 0; i < cards; i++) drawCardFromDeck({ deck, setGameState });
  changeTurn({ setGameState, isClockwise });
};
