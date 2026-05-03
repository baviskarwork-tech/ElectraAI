"use client";

import { motion } from 'framer-motion';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}

export default function QuizCard({ question, selectedAnswer, onAnswer }: QuizCardProps) {
  const showExplanation = !!selectedAnswer;

  const handleSelect = (option: string) => {
    if (!selectedAnswer) {
      onAnswer(option);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {question.question}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          
          let btnClass = "border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";
          if (selectedAnswer) {
            if (isCorrect) {
              btnClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
            } else if (isSelected) {
              btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            } else {
              btnClass = "border-gray-200 dark:border-gray-700 opacity-50";
            }
          }

          return (
            <button
              key={index}
              disabled={!!selectedAnswer}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-gray-800 dark:text-gray-200 ${btnClass}`}
              aria-label={`Option: ${option}`}
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
        >
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Explanation:</p>
          <p className="text-blue-700 dark:text-blue-400">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
