import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.MODEL || "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export const analyzeWithGemini = async (resumeText, jdText) => {
  try {
    const prompt = `
You are a precise and concise AI recruitment assistant.

Compare the candidate's resume with the provided job description and evaluate their fit for the role.

Return your response **strictly in valid JSON format** with the following keys:
{
  "score": (integer 0–100),
  "strengths": ["string"],
  "weaknesses": ["string"],
  "recommendations": ["string"]
}

### Rules:
- Each array must contain **3 to 4 short bullet points only**.
- Keep every point under **12 words**.
- Be **concise, factual, and professional**.
- Do **not** include introductions, explanations, or any text outside JSON.
- Avoid repetition and avoid generic filler words (e.g., "good", "strong").
- Focus on **resume vs job description** match.

### Example:
{
  "score": 82,
  "strengths": ["Proficient in Python and SQL", "Relevant project experience", "Strong analytical thinking"],
  "weaknesses": ["Limited leadership exposure", "No cloud technology mention"],
  "recommendations": ["Add measurable results", "Include recent industry certifications", "Emphasize teamwork experience"]
}

Resume:
${resumeText}

Job Description:
${jdText}
`;

    const response = await axios.post(
      ENDPOINT,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    const outputText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!outputText) throw new Error("No output from Gemini API");

    // Try to parse Gemini's output to JSON
    let parsedResult;
    try {
      // Extract JSON substring if Gemini wraps it with text
      const jsonMatch = outputText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON structure found");
      }
    } catch (err) {
      console.warn("⚠️ Gemini output not valid JSON, returning safe fallback.");
      parsedResult = {
        score: null,
        strengths: [],
        weaknesses: [],
        recommendations: [],
        rawOutput: outputText,
      };
    }

    return parsedResult;
  } catch (error) {
    console.error(
      "❌ Gemini API Error:",
      error.response?.data || error.message
    );

    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    } else if (error.message.includes("overloaded")) {
      throw new Error(
        "Gemini API is currently overloaded. Please try again later."
      );
    } else {
      throw new Error("Gemini API call failed");
    }
  }
};
