import { render, screen, fireEvent } from '@testing-library/react';
import QuizPage from '@/app/quiz/page';
import QuizCard from '@/components/QuizCard';
import { useQuiz } from '@/hooks/useQuiz';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  },
}));

describe('Quiz Page & Components', () => {
  beforeEach(() => {
    useQuiz.getState().resetQuiz();
  });

  const mockQuestion = {
    id: 'q1',
    question: 'Test Question',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A',
    explanation: 'Test Explanation'
  };

  it('11. renders QuizCard with options', () => {
    render(<QuizCard question={mockQuestion} selectedAnswer={undefined} onAnswer={() => {}} />);
    expect(screen.getByText('Test Question')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('12. shows explanation only after answer is selected', () => {
    const { rerender } = render(<QuizCard question={mockQuestion} selectedAnswer={undefined} onAnswer={() => {}} />);
    expect(screen.queryByText('Explanation:')).not.toBeInTheDocument();

    rerender(<QuizCard question={mockQuestion} selectedAnswer="A" onAnswer={() => {}} />);
    expect(screen.getByText('Explanation:')).toBeInTheDocument();
    expect(screen.getByText('Test Explanation')).toBeInTheDocument();
  });

  it('13. handles answer selection', () => {
    const onAnswerMock = jest.fn();
    render(<QuizCard question={mockQuestion} selectedAnswer={undefined} onAnswer={onAnswerMock} />);
    
    fireEvent.click(screen.getByText('A'));
    expect(onAnswerMock).toHaveBeenCalledWith('A');
  });

  it('14. QuizPage renders knowledge check header', () => {
    render(<QuizPage />);
    expect(screen.getByText('Knowledge Check')).toBeInTheDocument();
    expect(screen.getByText(/Question 1 of/)).toBeInTheDocument();
  });

  it('15. Next Question button appears after answering', () => {
    render(<QuizPage />);
    // Our quiz has questions from the store. Find the first option and click it.
    // The default first question has option 'Voting'
    const optionButton = screen.getByText('Voting');
    fireEvent.click(optionButton);
    
    expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});
