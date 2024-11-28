import Card from "@/components/card/Card";
import MaturaGameProps from "@/types/ez_matura/MaturaGameProps";

const MaturaGame = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  score,
  bestScore,
  currentCard,
  gameOver,
  onRestart,
}: MaturaGameProps) => {
  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        <h4
          className="sub-header"
          style={{
            fontSize: "3rem",
          }}
        >
          Koniec gry!
        </h4>
        <p className="text-lg">
          Twój wynik: <span className="text-rare font-bold">{score}</span> /{" "}
          <span className="text-epic font-bold">{totalQuestions}</span>
        </p>
        <button className="btn w-full px-6" onClick={onRestart}>
          Zagraj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4">
      <p className="text-gray-600 text-sm">
        Kategoria: <span className="text-epic">{currentQuestion.subject}</span>
      </p>
      <p className="text-lg mb-6 text-rare font-bold text-center text-wrap md:w-1/2">
        {currentQuestion.question}
      </p>
      <div className="flex flex-row justify-center items-stretch gap-6 w-full">
        {/* Karta nauczyciela */}
        {currentCard && (
          <div className="flex-1 hidden md:flex">
            <Card card={currentCard} />
          </div>
        )}

        {/* Przyciski odpowiedzi */}
        <div className="flex-1 grid grid-cols-1 gap-4 w-1/2">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className="btn px-6 h-full"
              style={{
                backgroundColor: selectedAnswer
                  ? answer === currentQuestion.correctAnswer
                    ? "var(--clr-common)"
                    : answer === selectedAnswer
                    ? "var(--clr-special)"
                    : ""
                  : "",
                border: selectedAnswer
                  ? answer === currentQuestion.correctAnswer
                    ? "var(--clr-common)"
                    : answer === selectedAnswer
                    ? "var(--clr-special)"
                    : ""
                  : "",
              }}
              onClick={() => onAnswer(answer)}
              disabled={!!selectedAnswer}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <p className="mt-4 text-sm text-gray-600">
          Pytanie {currentQuestionIndex + 1} z {totalQuestions}
        </p>
        <div className="flex justify-center gap-2 items-center">
          <p>
            Wynik: <span className="text-rare">{score}</span>
          </p>
          {"|"}
          <p className="">
            Najlepszy wynik: <span className="text-epic">{bestScore}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaturaGame;
