import { QuizQuestion, QuizMode } from '../types';

interface QuizScreenProps {
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  quizMode: QuizMode;
  onAnswer: (selected: string) => void;
  onFinish: () => void;
}

export const QuizScreen = ({
  question,
  currentQuestion,
  totalQuestions,
  quizMode,
  onAnswer,
  onFinish
}: QuizScreenProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">문제 {currentQuestion + 1} / {totalQuestions}</span>
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

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              {quizMode.includes('eng-to-kor') ? '영어 단어' : '한글 뜻'}
            </p>
            <h2 className="text-4xl font-bold text-gray-800">{question.question}</h2>
          </div>
        </div>

        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition transform hover:scale-105"
            >
              <span className="text-lg text-gray-800">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
