import { QuizQuestion } from '../types';

interface CardScreenProps {
  card: QuizQuestion;
  currentCard: number;
  totalCards: number;
  showAnswer: boolean;
  onShowAnswer: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export const CardScreen = ({
  card,
  currentCard,
  totalCards,
  showAnswer,
  onShowAnswer,
  onNext,
  onFinish
}: CardScreenProps) => {
  const progress = ((currentCard + 1) / totalCards) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">카드 {currentCard + 1} / {totalCards}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              <button
                onClick={onFinish}
                className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                종료
              </button>
            </div>
          </div>
          <div className="w-full bg-white rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: '#F0CEF4'
              }}
            />
          </div>
        </div>

        <button
          onClick={() => {
            if (!showAnswer) {
              onShowAnswer();
            } else {
              onNext();
            }
          }}
          className="w-full bg-white rounded-2xl shadow-lg p-8 mb-6 min-h-64 flex flex-col justify-center hover:shadow-xl transition cursor-pointer"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-8">{card.question}</h2>

            {showAnswer && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                {card.synonyms && card.synonyms.length > 1 ? (
                  <div>
                    <h3 className="text-4xl font-bold mb-4" style={{ color: '#F0CEF4' }}>
                      {card.synonyms.join(', ')}
                    </h3>
                    <p className="text-sm text-gray-500">모든 동의어</p>
                  </div>
                ) : (
                  <h3 className="text-4xl font-bold" style={{ color: '#F0CEF4' }}>
                    {card.correct}
                  </h3>
                )}
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
