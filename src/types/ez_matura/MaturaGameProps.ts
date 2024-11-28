import QuestionProps from "./QuestionProps";

interface MaturaGameProps {
  currentQuestion: QuestionProps;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  score: number;
  gameOver: boolean;
  onRestart: () => void;
}

export default MaturaGameProps;
