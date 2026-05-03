"use client";

import { useQuiz } from '@/hooks/useQuiz';
import QuizCard from '@/components/QuizCard';
import { motion } from 'framer-motion';

export default function QuizPage() {
  const { questions, currentQuestionIndex, score, answers, isFinished, answerQuestion, nextQuestion, resetQuiz } = useQuiz();

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl mb-8">You scored <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of {questions.length}.</p>
          
          <button 
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
          >
            Retake Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Knowledge Check</h1>
        <div className="text-sm font-semibold bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-full">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <QuizCard 
          question={currentQuestion} 
          selectedAnswer={selectedAnswer}
          onAnswer={(ans) => answerQuestion(currentQuestion.id, ans)}
        />
      </motion.div>

      {selectedAnswer && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-8 flex justify-end"
        >
          <button 
            onClick={nextQuestion}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
