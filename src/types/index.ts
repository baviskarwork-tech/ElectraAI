export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  dateStr: string;
  roles: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface UserProgress {
  userId: string;
  completedSteps: string[];
  quizScores: Record<string, number>;
  lastActive: string;
}
