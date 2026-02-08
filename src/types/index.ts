export type VocabData = {
  [category: string]: Array<{ [english: string]: string }>;
};

export type QuizMode = 'eng-to-kor-quiz' | 'kor-to-eng-quiz' | 'eng-to-kor-card' | 'kor-to-eng-card';

export type QuizQuestion = {
  question: string;
  correct: string;
  options?: string[];
  synonyms?: string[];
};

export type Answer = {
  question: QuizQuestion;
  selected: string;
  isCorrect: boolean;
};

export type AppStep = 'category' | 'pageSelect' | 'modeSelect' | 'quiz' | 'card' | 'cardComplete' | 'result';
