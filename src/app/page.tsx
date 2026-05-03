"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Understand Elections in 5 Minutes
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Demystify the democratic process with interactive timelines, AI-powered assistance, and engaging quizzes. Empowering citizens through education.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/timeline" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
          >
            Start Learning
          </Link>
          <Link 
            href="/assistant" 
            className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-800 dark:text-gray-200 rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
          >
            Ask AI Assistant
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800 w-full flex flex-col items-center"
      >
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          Powered by Google Cloud
        </p>
        <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="font-bold">Firebase Auth</span>
          <span className="font-bold">Firestore</span>
          <span className="font-bold">Gemini AI</span>
        </div>
      </motion.div>
    </div>
  );
}
