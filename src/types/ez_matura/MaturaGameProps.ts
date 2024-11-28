import CardProps from "../CardProps";
import QuestionProps from "./QuestionProps";

interface MaturaGameProps {
  currentQuestion: QuestionProps;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  score: number;
  bestScore: number;
  currentCard: CardProps | null;
  gameOver: boolean;
  onRestart: () => void;
}

export default MaturaGameProps;
