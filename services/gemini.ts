
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * Generates an optimized product description based on a title and category
   */
  async generateDescription(title: string, category: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional, persuasive sales description for a "${title}" listed in the "${category}" category on a Ghanaian marketplace. Focus on key benefits and mention typical buyer concerns in Ghana (reliability, price, location). Keep it under 150 words.`,
      });
      return response.text || "Failed to generate description.";
    } catch (error) {
      console.error("AI Description Error:", error);
      return "Unable to generate description at this time.";
    }
  },

  /**
   * Checks for potentially fraudulent or inappropriate content
   */
  async moderateListing(title: string, description: string): Promise<{ safe: boolean; reason?: string }> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this marketplace listing for scams, prohibited items (drugs, weapons), or highly suspicious promises. Return a JSON object with 'safe' (boolean) and 'reason' (string if not safe).
        Title: ${title}
        Description: ${description}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              safe: { type: Type.BOOLEAN },
              reason: { type: Type.STRING }
            },
            required: ['safe']
          }
        }
      });
      const result = JSON.parse(response.text || '{"safe": true}');
      return result;
    } catch (error) {
      console.error("Moderation Error:", error);
      return { safe: true }; // Default to safe if AI fails
    }
  }
};
