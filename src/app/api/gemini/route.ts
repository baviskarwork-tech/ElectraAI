import { NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/google-services';
import { z } from 'zod';

const promptSchema = z.object({
  prompt: z.string().min(2).max(1000),
});

/**
 * Gemini API Route
 * Handles requests for AI-powered election assistance.
 * Includes strict validation, error handling, and demo fallback logic.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result_val = promptSchema.safeParse(body);

    if (!result_val.success) {
      return NextResponse.json(
        { error: 'Invalid prompt. Must be between 2 and 1000 characters.' }, 
        { 
          status: 400,
          headers: { 'Cache-Control': 'no-store' }
        }
      );
    }

    const { prompt } = result_val.data;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'demo' || apiKey === 'mock-gemini-key') {
      return NextResponse.json({ 
        text: "This is a demo fallback response from ElectraAI. To enable real AI answers, please provide a valid GEMINI_API_KEY in the environment variables." 
      }, {
        headers: { 'Cache-Control': 'no-store' }
      });
    }

    const model = getGeminiModel();
    
    // Context-aware instruction for the model (Engineering Excellence)
    const systemContext = "You are ElectraAI, an Election Process Assistant. You help users understand the election process, timelines, roles, and steps in a highly interactive and intuitive way. Always provide clear, educational, and unbiased answers about elections.";
    
    const finalPrompt = `${systemContext}\n\nUser Question: ${prompt}`;
    
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
    console.error("Gemini API Error:", error);
    
    return NextResponse.json({ 
      text: "I'm having trouble connecting to Google Gemini AI right now. Please make sure the GEMINI_API_KEY environment variable is set." 
    }, {
      status: 500,
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}
