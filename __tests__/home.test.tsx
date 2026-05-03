import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('1. renders the main heading correctly', () => {
    render(<Home />);
    expect(screen.getByText('Understand Elections in 5 Minutes')).toBeInTheDocument();
  });

  it('2. renders the descriptive paragraph', () => {
    render(<Home />);
    expect(screen.getByText(/Demystify the democratic process/i)).toBeInTheDocument();
  });

  it('3. renders the Start Learning link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /Start Learning/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/timeline');
  });

  it('4. renders the Ask AI Assistant link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /Ask AI Assistant/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/assistant');
  });

  it('5. renders the Powered by Google Cloud section', () => {
    render(<Home />);
    expect(screen.getByText('Powered by Google Cloud')).toBeInTheDocument();
    expect(screen.getByText('Firebase Auth')).toBeInTheDocument();
    expect(screen.getByText('Firestore')).toBeInTheDocument();
    expect(screen.getByText('Gemini AI')).toBeInTheDocument();
  });
});
