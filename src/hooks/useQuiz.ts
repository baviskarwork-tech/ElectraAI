import { create } from 'zustand';
import { QUIZ_QUESTIONS } from '@/data/election';
import { QuizQuestion } from '@/types';

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  answers: Record<string, string>;
  isFinished: boolean;
  answerQuestion: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

/**
 * useQuiz Hook (Zustand Store)
 * Manages the global state for the Knowledge Check module.
 * Tracks questions, current index, scores, and user answers.
 */
export const useQuiz = create<QuizState>((set) => ({
  questions: QUIZ_QUESTIONS,
  currentQuestionIndex: 0,
  score: 0,
  answers: {},
  isFinished: false,

  /**
   * Records a user's answer and updates the score if correct.
   */
  answerQuestion: (questionId: string, answer: string) => set((state) => {
    const question = state.questions.find(q => q.id === questionId);
    if (!question || state.answers[questionId]) return state;

    const isCorrect = question.correctAnswer === answer;
    return {
      answers: { ...state.answers, [questionId]: answer },
      score: isCorrect ? state.score + 1 : state.score
    };
  }),

  /**
   * Advances the user to the next question or finishes the quiz.
   */
  nextQuestion: () => set((state) => {
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      return { isFinished: true };
    }
    return { currentQuestionIndex: state.currentQuestionIndex + 1 };
  }),

  /**
   * Resets the quiz to its initial state.
   */
  resetQuiz: () => set({ currentQuestionIndex: 0, score: 0, answers: {}, isFinished: false })
}));
