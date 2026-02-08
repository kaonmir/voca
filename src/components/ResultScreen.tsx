import { BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { Answer } from '../types';

interface ResultScreenProps {
  score: number;
  answers: Answer[];
  onRestart: () => void;
}

export const ResultScreen = ({ score, answers, onRestart }: ResultScreenProps) => {
  const wrongAnswers = answers.filter(a => !a.isCorrect);
  const totalAnswered = answers.length;
  const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4" style={{ color: '#F0CEF4' }} />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">시험 완료!</h1>

          <div className="text-6xl font-bold mb-2" style={{ color: '#F0CEF4' }}>
            {percentage}점
          </div>
          <p className="text-gray-600 text-lg mb-6">
            {score} / {totalAnswered} 정답
          </p>

          {percentage >= 80 ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">훌륭해요!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <XCircle className="w-6 h-6" />
              <span className="font-semibold">조금 더 연습해보세요!</span>
            </div>
          )}
        </div>

        {wrongAnswers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">틀린 단어 ({wrongAnswers.length}개)</h2>
            <div className="space-y-3">
              {wrongAnswers.map((answer, index) => (
                <div key={index} className="border-2 rounded-xl p-4" style={{ borderColor: '#F0CEF4' }}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-lg text-gray-800">{answer.question.question}</span>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-sm">
                    <p className="text-green-600">정답: {answer.question.correct}</p>
                    <p className="text-red-600">선택: {answer.selected}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:opacity-90 transition"
          style={{ backgroundColor: '#F0CEF4' }}
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};
