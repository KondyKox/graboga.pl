import { useEffect, useState } from "react";
import MaturaGame from "./MaturaGame";
import QuestionProps from "@/types/ez_matura/QuestionProps";
import useCards from "@/hooks/useCards";
import CardProps from "@/types/CardProps";

// Funkcja mieszająca tablicę
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const EzMaturaMode = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const cards = useCards();
  const [currentCard, setCurrentCard] = useState<CardProps | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/data/matura.json");
      const data = await response.json();

      // Mieszaj pytania i odpowiedzi
      const shuffledQuestions = data
        .map((question: QuestionProps) => ({
          ...question,
          answers: shuffleArray(question.answers),
        }))
        .sort(() => 0.5 - Math.random());

      setQuestions(shuffledQuestions);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const currentSubject = questions[currentQuestionIndex].subject;

      // Filter cards by the subject
      const matchingCards = cards.filter(
        (card) => card.subject == currentSubject
      );

      // Random card
      const randomCard =
        matchingCards[Math.floor(Math.random() * matchingCards.length)];
      setCurrentCard(randomCard);
    }
  }, [currentQuestionIndex, cards, questions]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameOver(false);
  };

  if (questions.length === 0)
    return <h3 className="sub-header">Ładowanie pytań...</h3>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center flex-col mt-2 w-full">
      <h2 className="sub-header">Ez Matura</h2>
      <MaturaGame
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        score={score}
        bestScore={bestScore}
        currentCard={currentCard}
        gameOver={gameOver}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default EzMaturaMode;
