import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AssistantPage from '@/app/assistant/page';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  },
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
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Powered by Gemini AI')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask a question...')).toBeInTheDocument();
  });

  it('17. allows user to type a message', () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    expect(input).toHaveValue('How do I vote?');
  });

  it('18. sends message and displays response', async () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText('Ask a question...');
    const form = input.closest('form');
    
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
