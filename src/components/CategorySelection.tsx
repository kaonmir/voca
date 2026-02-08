import { VocabData } from '../types';

interface CategorySelectionProps {
  vocabData: VocabData;
  onSelectCategory: (category: string) => void;
}

export const CategorySelection = ({ vocabData, onSelectCategory }: CategorySelectionProps) => {
  const availableCategories = Object.keys(vocabData).filter(
    category => vocabData[category] && vocabData[category].length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <img
            src="/love.jpg"
            alt="Love"
            className="w-24 h-24 mx-auto mb-4 rounded-full object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">영어 단어 암기</h1>
          <p className="text-gray-600">학습할 카테고리를 선택하세요</p>
        </div>

        <div className="space-y-4">
          {availableCategories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-800">{category}</span>
                <span className="text-sm text-gray-500">{vocabData[category].length} 페이지</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
