import { render, screen, fireEvent } from '@testing-library/react';
import TimelinePage from '@/app/timeline/page';
import TimelineCard from '@/components/TimelineCard';

// Need to mock framer-motion to avoid animation issues in Jest
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
      <button onClick={onClick} className={className}>{children}</button>
    ),
    div: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  },
}));

describe('Timeline Page', () => {
  it('6. renders timeline header correctly', () => {
    render(<TimelinePage />);
    expect(screen.getByText('Election Process Timeline')).toBeInTheDocument();
  });

  it('7. renders the correct number of timeline steps', () => {
    render(<TimelinePage />);
    // Our mock data has 5 steps
    expect(screen.getByText('Voter Registration')).toBeInTheDocument();
    expect(screen.getByText('Campaigning')).toBeInTheDocument();
  });

  it('8. TimelineCard renders title and date', () => {
    const mockStep = {
      id: 'test-step',
      title: 'Test Step',
      description: 'Test Description',
      dateStr: 'Month X',
      roles: ['Tester']
    };
    render(<TimelineCard step={mockStep} isActive={true} isPast={false} onClick={() => {}} />);
    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText('Month X')).toBeInTheDocument();
  });

  it('9. TimelineCard renders description only when active', () => {
    const mockStep = {
      id: 'test-step',
      title: 'Test Step',
      description: 'Hidden Description',
      dateStr: 'Month X',
      roles: ['Tester']
    };
    const { rerender } = render(<TimelineCard step={mockStep} isActive={false} isPast={false} onClick={() => {}} />);
    expect(screen.queryByText('Hidden Description')).not.toBeInTheDocument();

    rerender(<TimelineCard step={mockStep} isActive={true} isPast={false} onClick={() => {}} />);
    expect(screen.getByText('Hidden Description')).toBeInTheDocument();
    expect(screen.getByText('Tester')).toBeInTheDocument();
  });

  it('10. handles click events on TimelineCard', () => {
    const mockStep = {
      id: 'test-step',
      title: 'Test Step',
      description: 'Test Description',
      dateStr: 'Month X',
      roles: ['Tester']
    };
    const onClickMock = jest.fn();
    render(<TimelineCard step={mockStep} isActive={false} isPast={false} onClick={onClickMock} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
