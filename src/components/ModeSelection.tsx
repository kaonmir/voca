import { QuizMode } from '../types';

interface ModeSelectionProps {
  totalWords: number;
  onSelectMode: (mode: QuizMode) => void;
}

export const ModeSelection = ({ totalWords, onSelectMode }: ModeSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">학습 방식 선택</h1>
          <p className="text-gray-600">어떤 방식으로 학습할까요?</p>
          <p className="text-sm text-gray-500 mt-2">총 {totalWords}개 단어</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 px-2">📝 시험 모드 (4지선다)</h2>
          <div className="space-y-3">
            <button
              onClick={() => onSelectMode('eng-to-kor-quiz')}
              className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">영어 → 한글</h3>
              <p className="text-sm text-gray-600">영어 단어를 보고 한글 뜻을 맞추기</p>
            </button>

            <button
              onClick={() => onSelectMode('kor-to-eng-quiz')}
              className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">한글 → 영어</h3>
              <p className="text-sm text-gray-600">한글 뜻을 보고 영어 단어를 맞추기</p>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3 px-2">📚 학습 모드 (플래시카드)</h2>
          <div className="space-y-3">
            <button
              onClick={() => onSelectMode('eng-to-kor-card')}
              className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">영어 → 한글</h3>
              <p className="text-sm text-gray-600">영어 단어를 보고 한글 뜻 확인하기</p>
            </button>

            <button
              onClick={() => onSelectMode('kor-to-eng-card')}
              className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">한글 → 영어</h3>
              <p className="text-sm text-gray-600">한글 뜻을 보고 영어 단어 확인하기</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
