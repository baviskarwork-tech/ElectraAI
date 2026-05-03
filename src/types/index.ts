import { User as FirebaseUser } from 'firebase/auth';

/**
 * Election Process Timeline Step
 */
export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  dateStr: string;
  roles: string[];
}

/**
 * Quiz Question Structure
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

/**
 * User Progress Tracking
 */
export interface UserProgress {
  userId: string;
  completedSteps: string[];
  quizScores: Record<string, number>;
  lastActive: string;
}

/**
 * AI Assistant Message
 */
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * App User Type (aliased from Firebase)
 */
export type AppUser = FirebaseUser;
