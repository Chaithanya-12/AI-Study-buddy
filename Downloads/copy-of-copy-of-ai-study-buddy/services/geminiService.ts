
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Summary } from "../types";

const getAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const chatWithAI = async (message: string, history: { role: string; content: string }[], simpleMode: boolean) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a friendly AI Study Buddy. 
      Your goal is to help students learn productively.
      ${simpleMode ? "EXPLAIN EVERYTHING IN VERY SIMPLE LANGUAGE (ELI5 mode)." : "Provide clear, structured academic explanations."}
      If the user asks a doubt, break it down step-by-step. 
      Encourage critical thinking.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const summarizeNotes = async (notes: string): Promise<Summary> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please summarize these study notes. Provide a clear title, 5-7 main points, a simplified one-paragraph explanation, and 3-5 flashcard style questions/answers.\n\nNotes: ${notes}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          mainPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          simplifiedExplanation: { type: Type.STRING },
          flashcards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING }
              },
              required: ["question", "answer"]
            }
          }
        },
        required: ["title", "mainPoints", "simplifiedExplanation", "flashcards"]
      }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
};

export const generateDailyPlan = async (reminders: string[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on these pending tasks: ${reminders.join(", ")}, create a high-productivity 5-step daily plan for a student today. Keep it short and motivating.`,
  });
  return response.text;
};
