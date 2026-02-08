interface PageSelectionProps {
  selectedCategory: string;
  categoryData: Array<{ [english: string]: string }>;
  selectedPages: number[];
  onTogglePage: (index: number) => void;
  onNext: () => void;
}

export const PageSelection = ({
  selectedCategory,
  categoryData,
  selectedPages,
  onTogglePage,
  onNext
}: PageSelectionProps) => {
  const totalWords = selectedPages.reduce((acc, idx) => acc + Object.keys(categoryData[idx]).length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedCategory}</h1>
          <p className="text-gray-600">학습할 페이지를 선택하세요 (복수 선택 가능)</p>
        </div>

        <div className="space-y-3 mb-6">
          {categoryData.map((page, index) => {
            const wordCount = Object.keys(page).length;
            const isSelected = selectedPages.includes(index);

            return (
              <button
                key={index}
                onClick={() => onTogglePage(index)}
                className={`w-full rounded-2xl shadow-lg p-5 transition ${
                  isSelected ? 'ring-4 ring-[#F0CEF4] text-white' : 'bg-white text-gray-800'
                }`}
                style={isSelected ? {
                  backgroundColor: '#F0CEF4'
                } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">페이지 {index + 1}</span>
                  <span className="text-sm">{wordCount} 단어</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedPages.length > 0 && (
          <button
            onClick={onNext}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:opacity-90 transition"
            style={{ backgroundColor: '#F0CEF4' }}
          >
            다음 ({totalWords} 문제)
          </button>
        )}
      </div>
    </div>
  );
};
