import { useEffect, useState } from "react";
import MaturaGame from "./MaturaGame";
import QuestionProps from "@/types/ez_matura/QuestionProps";

const EzMaturaMode = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Pobierz pytania z API
    const fetchQuestions = async () => {
      const response = await fetch("/data/matura.json");
      const data = await response.json();

      const shuffledQuestions = data.sort(() => 0.5 - Math.random());
      setQuestions(shuffledQuestions);
    };

    fetchQuestions();
  }, []);

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
    <div className="flex justify-center items-center flex-col mt-4">
      <h2 className="sub-header">Ez Matura</h2>
      <MaturaGame
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        score={score}
        gameOver={gameOver}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default EzMaturaMode;
