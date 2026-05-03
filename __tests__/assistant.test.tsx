import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AssistantPage from '@/app/assistant/page';

// Mock next/dynamic to render synchronously in tests
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/components/AssistantChat').default;
  },
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ text: 'Mocked Gemini Response' }),
  })
) as jest.Mock;

describe('Assistant Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('16. renders the assistant UI correctly', () => {
    render(<AssistantPage />);
    expect(screen.getByText('Election AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Powered by Google Gemini AI')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask a question about elections...')).toBeInTheDocument();
  });

  it('17. allows user to type a message', () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText('Ask a question about elections...');
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    expect(input).toHaveValue('How do I vote?');
  });

  it('18. sends message and displays response', async () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText('Ask a question about elections...');
    const form = screen.getByLabelText('Send message').closest('form');
    
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    if (form) {
      fireEvent.submit(form);
    }

    // Input should be cleared
    expect(input).toHaveValue('');
    
    // User message should appear
    expect(screen.getByText('How do I vote?')).toBeInTheDocument();

    // Wait for mocked API response
    await waitFor(() => {
      expect(screen.getByText('Mocked Gemini Response')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
