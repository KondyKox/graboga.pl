import MaturaGameProps from "@/types/ez_matura/MaturaGameProps";

const MaturaGame = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  score,
  gameOver,
  onRestart,
}: MaturaGameProps) => {
  if (gameOver) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Koniec gry!</h1>
        <p className="text-lg">
          Twój wynik: {score} / {totalQuestions}
        </p>
        <button className="btn w-full" onClick={onRestart}>
          Zagraj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg mb-6 text-special">{currentQuestion.question}</p>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            className={`btn px-2 ${
              selectedAnswer
                ? answer === currentQuestion.correctAnswer
                  ? "bg-green-500 text-white"
                  : answer === selectedAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => onAnswer(answer)}
            disabled={!!selectedAnswer}
          >
            {answer}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Pytanie {currentQuestionIndex + 1} z {totalQuestions}
      </p>
    </div>
  );
};

export default MaturaGame;
