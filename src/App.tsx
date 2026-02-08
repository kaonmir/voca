import { CategorySelection } from './components/CategorySelection';
import { PageSelection } from './components/PageSelection';
import { ModeSelection } from './components/ModeSelection';
import { QuizScreen } from './components/QuizScreen';
import { CardScreen } from './components/CardScreen';
import { CardCompleteScreen } from './components/CardCompleteScreen';
import { ResultScreen } from './components/ResultScreen';
import { useQuizLogic } from './hooks/useQuizLogic';
import { VOCAB_DATA } from './data/vocabData';

function App() {
  const {
    step,
    selectedCategory,
    selectedPages,
    quizMode,
    quizQuestions,
    currentQuestion,
    showAnswer,
    answers,
    score,
    setStep,
    setShowAnswer,
    handleCategorySelect,
    togglePageSelect,
    handleModeSelect,
    handleAnswer,
    handleNextCard,
    finishQuiz,
    restart
  } = useQuizLogic();

  if (step === 'category') {
    return (
      <CategorySelection
        vocabData={VOCAB_DATA}
        onSelectCategory={handleCategorySelect}
      />
    );
  }

  if (step === 'pageSelect') {
    return (
      <PageSelection
        selectedCategory={selectedCategory}
        categoryData={VOCAB_DATA[selectedCategory]}
        selectedPages={selectedPages}
        onTogglePage={togglePageSelect}
        onNext={() => setStep('modeSelect')}
      />
    );
  }

  if (step === 'modeSelect') {
    const categoryData = VOCAB_DATA[selectedCategory];
    const totalWords = selectedPages.reduce((acc, idx) => acc + Object.keys(categoryData[idx]).length, 0);

    return (
      <ModeSelection
        totalWords={totalWords}
        onSelectMode={handleModeSelect}
      />
    );
  }

  if (step === 'quiz') {
    return (
      <QuizScreen
        question={quizQuestions[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={quizQuestions.length}
        quizMode={quizMode}
        onAnswer={handleAnswer}
        onFinish={finishQuiz}
      />
    );
  }

  if (step === 'card') {
    return (
      <CardScreen
        card={quizQuestions[currentQuestion]}
        currentCard={currentQuestion}
        totalCards={quizQuestions.length}
        showAnswer={showAnswer}
        onShowAnswer={() => setShowAnswer(true)}
        onNext={handleNextCard}
        onFinish={() => setStep('cardComplete')}
      />
    );
  }

  if (step === 'cardComplete') {
    return (
      <CardCompleteScreen
        totalCards={currentQuestion + 1}
        onRestart={restart}
      />
    );
  }

  if (step === 'result') {
    return (
      <ResultScreen
        score={score}
        answers={answers}
        onRestart={restart}
      />
    );
  }

  return null;
}

export default App;
