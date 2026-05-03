import { POST } from '@/app/api/gemini/route';

interface MockResponse {
  status: number;
  json: () => Promise<{ error?: string; text?: string }>;
}

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data: unknown, init?: { status?: number }): MockResponse => {
      return {
        status: init?.status || 200,
        json: () => Promise.resolve(data as { error?: string; text?: string }),
      };
    }),
  },
}));

jest.mock('@/lib/google-services', () => ({
  getGeminiModel: jest.fn(() => ({
    generateContent: jest.fn(() => Promise.resolve({
      response: { text: () => 'Mocked Response' }
    }))
  }))
}));

describe('Gemini API Route', () => {
  it('31. returns 400 for empty prompt', async () => {
    const req = {
      json: () => Promise.resolve({ prompt: '' }),
    } as unknown as Request;
    
    const res = await POST(req) as unknown as MockResponse;
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/Invalid prompt/);
  });

  it('32. returns 400 for too long prompt', async () => {
    const longPrompt = 'a'.repeat(1001);
    const req = {
      json: () => Promise.resolve({ prompt: longPrompt }),
    } as unknown as Request;
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('33. returns fallback response when API key is demo', async () => {
    process.env.GEMINI_API_KEY = 'demo';
    const req = {
      json: () => Promise.resolve({ prompt: 'How to vote?' }),
    } as unknown as Request;
    
    const res = await POST(req) as unknown as MockResponse;
    const data = await res.json();
    expect(data.text).toMatch(/demo fallback response/);
  });

  it('38. handles empty assistant input safely (Edge Case)', async () => {
    const req = {
      json: () => Promise.resolve({}),
    } as unknown as Request;
    
    const res = await POST(req) as unknown as MockResponse;
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/Invalid prompt/);
  });
});
