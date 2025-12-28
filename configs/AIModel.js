import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GENAI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GENAI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Export the genAI instance to create models as needed
export const generativeAI = genAI;

// Helper function to generate content
export async function generateAIResponse(prompt) {
  try {
    // User verified that models/gemini-flash-latest works
    const model = genAI.getGenerativeModel({ 
      model: "models/gemini-flash-latest",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}
