"use client";

import { motion } from 'framer-motion';
import { TimelineStep } from '../types';

interface TimelineCardProps {
  step: TimelineStep;
  isActive: boolean;
  isPast: boolean;
  onClick: () => void;
}

export default function TimelineCard({ step, isActive, isPast, onClick }: TimelineCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full text-left p-6 rounded-2xl border-2 transition-all duration-300
        ${isActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/20' 
          : isPast 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/10 opacity-70' 
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 opacity-50 hover:opacity-100'}
      `}
      aria-label={`Timeline step: ${step.title}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-bold text-xl ${isActive ? 'text-blue-700 dark:text-blue-400' : isPast ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}`}>
          {step.title}
        </h3>
        <span className="text-sm font-semibold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">
          {step.dateStr}
        </span>
      </div>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4"
        >
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {step.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Roles:</span>
            {step.roles.map(role => (
              <span key={role} className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md">
                {role}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}
