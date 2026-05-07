import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function generateLessonContent(currentLevel: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short English lesson for level ${currentLevel}. 
      Include:
      1. A phrase in Spanish to translate to English.
      2. The correct English translation.
      3. 4-6 word chips for a translation exercise.
      4. A brief explanation of the grammar used.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spanishPhrase: { type: Type.STRING },
            englishTranslation: { type: Type.STRING },
            wordChips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            explanation: { type: Type.STRING }
          },
          required: ["spanishPhrase", "englishTranslation", "wordChips", "explanation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating lesson content:", error);
    return null;
  }
}
