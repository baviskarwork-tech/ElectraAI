"use client";

import { useCallback, memo } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import QuizCard from '@/components/QuizCard';
import { motion } from 'framer-motion';
import { clamp } from '@/utils/performance';

/**
 * Quiz Constants
 */
const PASS_THRESHOLD = 80;

/**
 * QuizPage Component
 * Root component for the Knowledge Check module.
 * Manages the transition between question view and results view.
 * Utilizes memoized handlers and performance utilities for optimal rendering.
 */
function QuizPage() {
  const { 
    questions, 
    currentQuestionIndex, 
    score, 
    answers, 
    isFinished, 
    answerQuestion, 
    nextQuestion, 
    resetQuiz 
  } = useQuiz();

  /**
   * Dispatches the selected answer to the quiz state manager.
   * Uses a stable reference to prevent QuizCard re-renders.
   */
  const handleAnswer = useCallback((ans: string) => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    answerQuestion(currentQuestionId, ans);
  }, [questions, currentQuestionIndex, answerQuestion]);

  /**
   * Triggers a complete reset of the quiz state.
   */
  const handleResetClick = useCallback(() => {
    resetQuiz();
  }, [resetQuiz]);

  /**
   * Advances the user to the next question in the sequence.
   */
  const handleNextClick = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  /**
   * Results View
   */
  if (isFinished) {
    const displayScore = clamp(score, 0, questions.length);
    const scorePercentage = (displayScore / questions.length) * 100;
    const isPassed = scorePercentage >= PASS_THRESHOLD;

    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-800"
        >
          <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl mb-2">
            You scored <span className="font-bold text-blue-600 dark:text-blue-400">{displayScore}</span> out of {questions.length}.
          </p>
          <div className="mb-8">
            <span className={`text-sm font-bold uppercase tracking-widest ${isPassed ? 'text-green-500' : 'text-orange-500'}`}>
              {isPassed ? 'Excellence Achieved' : 'Keep Learning'}
            </span>
          </div>
          
          <button 
            onClick={handleResetClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            aria-label="Restart the knowledge check"
          >
            Retake Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  /**
   * Question View
   */
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Knowledge Check</h1>
        <div 
          className="text-sm font-semibold bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          aria-label={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
        >
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </header>

      <motion.div
        key={currentQuestion.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <QuizCard 
          question={currentQuestion} 
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
        />
      </motion.div>

      {selectedAnswer && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-8 flex justify-end"
        >
          <button 
            onClick={handleNextClick}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:translate-x-1 shadow-lg"
            aria-label={currentQuestionIndex === questions.length - 1 ? 'Complete the quiz' : 'Next question'}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default memo(QuizPage);
