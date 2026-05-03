import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/lib/google-services', () => ({
  getUserProgress: jest.fn(() => Promise.resolve({ completedSteps: 3, score: 90 })),
  saveUserProgress: jest.fn(),
}));

describe('Dashboard Page', () => {
  it('34. redirects to login if not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<DashboardPage />);
    expect(push).toHaveBeenCalledWith('/login');
  });

  it('35. renders progress stats for authenticated user', async () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { uid: '123', displayName: 'Sagar' }, 
      loading: false 
    });

    render(<DashboardPage />);
    expect(screen.getByText('Welcome, Sagar')).toBeInTheDocument();
    
    // Check for stats (they might be in the document after async load, but initially placeholders/fallback)
    expect(screen.getByText('Modules Completed')).toBeInTheDocument();
    expect(screen.getByText('Quiz Average')).toBeInTheDocument();
  });
});
