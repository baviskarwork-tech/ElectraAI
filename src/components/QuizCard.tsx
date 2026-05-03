"use client";

import { memo } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}

/**
 * QuizCard Component
 * Displays a quiz question and its options.
 * Implements ARIA states and accessible status messaging for screen readers.
 */
function QuizCard({ question, selectedAnswer, onAnswer }: QuizCardProps) {
  const showExplanation = !!selectedAnswer;

  const handleSelect = (option: string) => {
    if (!selectedAnswer) {
      onAnswer(option);
    }
  };

  return (
    <section 
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800"
      aria-labelledby={`quiz-q-${question.id}`}
    >
      <h2 
        id={`quiz-q-${question.id}`}
        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
      >
        {question.question}
      </h2>
      
      <div 
        className="space-y-4" 
        role="radiogroup" 
        aria-required="true"
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          
          let btnClass = "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";
          let ariaStatus = "";

          if (selectedAnswer) {
            if (isCorrect) {
              btnClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
              ariaStatus = " (Correct Answer)";
            } else if (isSelected) {
              btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
              ariaStatus = " (Incorrect Answer)";
            } else {
              btnClass = "border-gray-200 dark:border-gray-700 opacity-50";
            }
          }

          return (
            <button
              key={index}
              disabled={!!selectedAnswer}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none ${btnClass}`}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Option ${index + 1}: ${option}${ariaStatus}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"
          role="status"
          aria-live="polite"
        >
          <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">Explanation:</p>
          <p className="text-blue-700 dark:text-blue-400 leading-relaxed">{question.explanation}</p>
        </motion.div>
      )}
    </section>
  );
}

export default memo(QuizCard);
