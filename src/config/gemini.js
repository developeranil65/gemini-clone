import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_API_KEY;


const ai = new GoogleGenAI({ apiKey });

const askGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    config: {
      responseMimeType: 'text/plain',
    },
  });

  const result = response.text;
  console.log(result);
  return result;
};

export default askGemini;
