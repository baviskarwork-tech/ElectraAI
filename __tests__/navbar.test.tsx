import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');

describe('Navbar Component', () => {
  it('19. renders branding and standard links', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getByText('ElectraAI')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
  });

  it('20. renders Sign In when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false, logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByLabelText('Logout')).not.toBeInTheDocument();
  });

  it('21. renders Dashboard and Logout when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { displayName: 'Test User' }, 
      loading: false, 
      logout: jest.fn() 
    });
    render(<Navbar />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByLabelText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});
