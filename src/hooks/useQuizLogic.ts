import { useState } from 'react';
import { QuizMode, QuizQuestion, Answer, AppStep } from '../types';
import { VOCAB_DATA } from '../data/vocabData';

export const useQuizLogic = () => {
  const [step, setStep] = useState<AppStep>('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [quizMode, setQuizMode] = useState<QuizMode>('eng-to-kor-quiz');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedPages([]);
    setStep('pageSelect');
  };

  const togglePageSelect = (index: number) => {
    setSelectedPages(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleModeSelect = (mode: QuizMode) => {
    setQuizMode(mode);
    generateQuestions(mode);
  };

  const generateQuestions = (mode: QuizMode) => {
    const categoryData = VOCAB_DATA[selectedCategory];
    const allWords: Array<{ eng: string; kor: string }> = [];

    selectedPages.forEach(pageIndex => {
      const page = categoryData[pageIndex];
      Object.entries(page).forEach(([eng, kor]) => {
        allWords.push({ eng, kor });
      });
    });

    let questions: QuizQuestion[];
    const isCardMode = mode.includes('card');
    const isEngToKor = mode.includes('eng-to-kor');

    if (isCardMode) {
      if (isEngToKor) {
        questions = allWords.map(word => ({
          question: word.eng,
          correct: word.kor
        })).sort(() => Math.random() - 0.5);
      } else {
        const korToEngMap: { [key: string]: string[] } = {};
        allWords.forEach(word => {
          if (!korToEngMap[word.kor]) {
            korToEngMap[word.kor] = [];
          }
          korToEngMap[word.kor].push(word.eng);
        });

        questions = Object.keys(korToEngMap).map(kor => ({
          question: kor,
          correct: korToEngMap[kor][0],
          synonyms: korToEngMap[kor]
        })).sort(() => Math.random() - 0.5);
      }
    } else if (isEngToKor) {
      const allKoreans = [...new Set(allWords.map(w => w.kor))];

      questions = allWords.map(word => {
        const wrongOptions = allKoreans
          .filter(k => k !== word.kor)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [...wrongOptions, word.kor]
          .sort(() => Math.random() - 0.5);

        return {
          question: word.eng,
          correct: word.kor,
          options
        };
      }).sort(() => Math.random() - 0.5);
    } else {
      const korToEngMap: { [key: string]: string[] } = {};
      allWords.forEach(word => {
        if (!korToEngMap[word.kor]) {
          korToEngMap[word.kor] = [];
        }
        korToEngMap[word.kor].push(word.eng);
      });

      questions = allWords.map(word => {
        const synonyms = korToEngMap[word.kor].filter(eng => eng !== word.eng);
        const availableOptions = allWords
          .map(w => w.eng)
          .filter(eng => eng !== word.eng && !synonyms.includes(eng));

        const wrongOptions = [...new Set(availableOptions)]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [...wrongOptions, word.eng]
          .sort(() => Math.random() - 0.5);

        return {
          question: word.kor,
          correct: word.eng,
          options
        };
      }).sort(() => Math.random() - 0.5);
    }

    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setShowAnswer(false);
    setAnswers([]);
    setStep(isCardMode ? 'card' : 'quiz');
  };

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === quizQuestions[currentQuestion].correct;
    setAnswers(prev => [...prev, {
      question: quizQuestions[currentQuestion],
      selected,
      isCorrect
    }]);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = [...answers, { isCorrect }].filter((a: { isCorrect: boolean }) => a.isCorrect).length;
      setScore(finalScore);
      setStep('result');
    }
  };

  const handleNextCard = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setStep('cardComplete');
    }
  };

  const finishQuiz = () => {
    const finalScore = answers.filter(a => a.isCorrect).length;
    setScore(finalScore);
    setStep('result');
  };

  const restart = () => {
    setStep('category');
    setSelectedCategory('');
    setSelectedPages([]);
    setQuizMode('eng-to-kor-quiz');
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setShowAnswer(false);
    setAnswers([]);
    setScore(0);
  };

  return {
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
  };
};
