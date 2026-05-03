import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import TimelineCard from '@/components/TimelineCard';
import QuizCard from '@/components/QuizCard';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => <button onClick={onClick} className={className}>{children}</button>,
    div: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  },
}));

describe('Extra Component Tests', () => {
  it('22. Navbar handles loading state gracefully', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: true, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getByText('ElectraAI')).toBeInTheDocument();
    // When loading, Sign In and Dashboard should both be hidden
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Logout')).not.toBeInTheDocument();
  });

  it('23. TimelineCard applies past styles correctly', () => {
    const mockStep = {
      id: 'step1', title: 'Past Step', description: 'Desc', dateStr: 'Date', roles: []
    };
    render(<TimelineCard step={mockStep} isActive={false} isPast={true} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/border-green-500/);
  });

  it('24. QuizCard correctly renders selected state for incorrect answer', () => {
    const mockQuestion = {
      id: 'q1', question: 'Q', options: ['A', 'B'], correctAnswer: 'B', explanation: 'E'
    };
    render(<QuizCard question={mockQuestion} selectedAnswer="A" onAnswer={() => {}} />);
    // Since 'A' is incorrect, it should be marked red (we use border-red-500 or bg-red-50)
    expect(screen.getByText('A').className).toMatch(/border-red-500/);
  });

  it('25. QuizCard correctly renders selected state for correct answer', () => {
    const mockQuestion = {
      id: 'q1', question: 'Q', options: ['A', 'B'], correctAnswer: 'B', explanation: 'E'
    };
    render(<QuizCard question={mockQuestion} selectedAnswer="B" onAnswer={() => {}} />);
    // Since 'B' is correct, it should be marked green
    expect(screen.getByText('B').className).toMatch(/border-green-500/);
  });
});
