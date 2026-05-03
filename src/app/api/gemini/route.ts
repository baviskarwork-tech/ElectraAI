import { NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/google-services';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const model = getGeminiModel();
    
    // Add context to make it an "Election Process Assistant"
    const systemContext = "You are ElectraAI, an Election Process Assistant. You help users understand the election process, timelines, roles, and steps in a highly interactive and intuitive way. Always provide clear, educational, and unbiased answers about elections.";
    
    const finalPrompt = `${systemContext}\n\nUser Question: ${prompt}`;
    
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback response for missing API key or other errors
    return NextResponse.json({ 
      text: "I'm having trouble connecting to Google Gemini AI right now. Please make sure the GEMINI_API_KEY environment variable is set." 
    });
  }
}
