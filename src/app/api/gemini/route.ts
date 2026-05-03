import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiModel } from '@/lib/google-services';

/**
 * Validation Constraints
 */
const MIN_PROMPT_LENGTH = 2;
const MAX_PROMPT_LENGTH = 1000;

/**
 * HTTP Status Codes
 */
const STATUS_BAD_REQUEST = 400;
const STATUS_INTERNAL_ERROR = 500;

/**
 * Gemini AI Configuration
 */
const SYSTEM_CONTEXT = "You are ElectraAI, an Election Process Assistant. You help users understand the election process, timelines, roles, and steps in a highly interactive and intuitive way. Always provide clear, educational, and unbiased answers about elections.";

const promptSchema = z.object({
  prompt: z.string().min(MIN_PROMPT_LENGTH).max(MAX_PROMPT_LENGTH),
});

/**
 * Gemini API Route Handler
 * Manages the generation of AI-powered election assistance responses.
 * Implements strict input validation, security headers, and production-safe logging.
 * 
 * @param req The incoming HTTP request containing the prompt
 * @returns JSON response with AI text or error message
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json() as Record<string, unknown>;
    const result_val = promptSchema.safeParse(body);

    if (!result_val.success) {
      return NextResponse.json(
        { error: `Invalid prompt. Must be between ${MIN_PROMPT_LENGTH} and ${MAX_PROMPT_LENGTH} characters.` }, 
        { 
          status: STATUS_BAD_REQUEST,
          headers: { 'Cache-Control': 'no-store' }
        }
      );
    }

    const { prompt } = result_val.data;

    // Check for API key presence
    const apiKey = process.env.GEMINI_API_KEY;
    const isDemo = !apiKey || apiKey === 'demo' || apiKey === 'mock-gemini-key';

    if (isDemo) {
      return NextResponse.json({ 
        text: "This is a demo fallback response from ElectraAI. To enable real AI answers, please provide a valid GEMINI_API_KEY in the environment variables." 
      }, {
        headers: { 'Cache-Control': 'no-store' }
      });
    }

    const model = getGeminiModel();
    const finalPrompt = `${SYSTEM_CONTEXT}\n\nUser Question: ${prompt}`;
    
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    // Safe logging guard for production environments
    if (process.env.NODE_ENV !== "production") {
      console.error("Gemini API Error:", error);
    }
    
    return NextResponse.json({ 
      text: "I'm having trouble connecting to Google Gemini AI right now. Please make sure the GEMINI_API_KEY environment variable is set." 
    }, {
      status: STATUS_INTERNAL_ERROR,
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}
