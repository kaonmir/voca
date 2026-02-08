import { CheckCircle } from 'lucide-react';

interface CardCompleteScreenProps {
  totalCards: number;
  onRestart: () => void;
}

export const CardCompleteScreen = ({ totalCards, onRestart }: CardCompleteScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">학습 완료!</h1>

          <div className="text-6xl font-bold mb-4" style={{ color: '#F0CEF4' }}>
            {totalCards}개
          </div>
          <p className="text-gray-600 text-lg mb-8">
            단어 학습을 완료했어요!
          </p>

          <div className="flex items-center justify-center gap-2 text-green-600 mb-8">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">잘하셨어요!</span>
          </div>

          <button
            onClick={onRestart}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:opacity-90 transition"
            style={{ backgroundColor: '#F0CEF4' }}
          >
            처음으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
