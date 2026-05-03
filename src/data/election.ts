import { TimelineStep, QuizQuestion } from '../types';

export const ELECTION_TIMELINE: TimelineStep[] = [
  {
    id: 'registration',
    title: 'Voter Registration',
    description: 'Citizens register to vote. This involves submitting identification and residency proof to the local election commission.',
    dateStr: 'Month 1',
    roles: ['Citizens', 'Election Officials']
  },
  {
    id: 'campaigning',
    title: 'Campaigning',
    description: 'Candidates share their platforms, debate, and rally to win public support.',
    dateStr: 'Month 2-3',
    roles: ['Candidates', 'Media', 'Citizens']
  },
  {
    id: 'voting',
    title: 'Election Day',
    description: 'Registered voters cast their ballots at designated polling stations or via mail.',
    dateStr: 'Month 4',
    roles: ['Citizens', 'Election Officials', 'Observers']
  },
  {
    id: 'counting',
    title: 'Vote Counting',
    description: 'Ballots are collected, verified, and counted securely.',
    dateStr: 'Month 4 (Post-Election)',
    roles: ['Election Officials', 'Observers']
  },
  {
    id: 'results',
    title: 'Results Declaration',
    description: 'Official results are announced, and the winning candidates are certified.',
    dateStr: 'Month 5',
    roles: ['Election Commission', 'Candidates', 'Citizens']
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the first step in the election process?',
    options: ['Voting', 'Campaigning', 'Voter Registration', 'Results Declaration'],
    correctAnswer: 'Voter Registration',
    explanation: 'Before anyone can vote, they must be registered with the electoral commission.'
  },
  {
    id: 'q2',
    question: 'Who ensures that the vote counting process is fair?',
    options: ['The Candidates', 'The Media', 'Election Officials and Observers', 'Only the current President'],
    correctAnswer: 'Election Officials and Observers',
    explanation: 'Independent observers and trained officials work together to verify counts.'
  },
  {
    id: 'q3',
    question: 'Which of the following is NOT a typical role for a citizen during elections?',
    options: ['Voting', 'Registering', 'Certifying the final results', 'Attending rallies'],
    correctAnswer: 'Certifying the final results',
    explanation: 'Certification is done by the official Election Commission, not individual citizens.'
  }
];
