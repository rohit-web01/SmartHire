import { extractText } from "../utils/fileParser.js";
import { analyzeWithGemini } from "../services/geminiService.js";

export const analyzeResume = async (req, res) => {
  try {
    // Extracting text from uploaded files
    let resumeText = "";
    let jdText = "";
  if (!req.files?.resume?.[0]) {
  return res.status(400).json({ message: "Please upload your resume." });
}
resumeText = await extractText(req.files.resume[0]);

if (req.files?.jdFile?.[0]) {
  jdText = await extractText(req.files.jdFile[0]);
} else if (req.body.jdText) {
  jdText = req.body.jdText;
}



    if (!jdText.trim()) {
      return res.status(400).json({
        message: "Please provide JD via file or textarea.",
      });
    }

    // Analyzing with Gemini model
    const analysisResult = await analyzeWithGemini(resumeText, jdText);

    res.json({
      message: "Analysis completed successfully!",
      analysis: analysisResult,
    });
  } catch (err) {
    console.error("Error analyzing files:", err);

    // Detect model overload or API failure
    const lowerMsg = err.message.toLowerCase();
    const isOverload =
      lowerMsg.includes("overload") || lowerMsg.includes("try again");
    const isQuota = lowerMsg.includes("quota") || lowerMsg.includes("limit");
    const isInvalidKey =
      lowerMsg.includes("api key") || lowerMsg.includes("unauthorized");

    let userMessage = "Analysis failed. Please try again.";
    if (isOverload) {
      userMessage =
        "The AI model is currently overloaded. Please try again in a few seconds.";
    } else if (isQuota) {
      userMessage = "API quota exceeded. Please try again later.";
    } else if (isInvalidKey) {
      userMessage =
        "Invalid or missing API key. Please check server configuration.";
    }

    res.status(500).json({
      message: err.message ? userMessage : "Analysis failed due to an unknown error.",
      error: err.message,
    });
  }
};
