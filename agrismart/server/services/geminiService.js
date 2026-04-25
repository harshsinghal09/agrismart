import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getModel = (vision = false) =>
  genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

/**
 * SAFE JSON PARSER (never crashes)
 */
const parseJSON = (text) => {
  try {
    const cleaned = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');

    if (start !== -1 && end !== -1) {
      return JSON.parse(cleaned.substring(start, end + 1));
    }

    console.log("❌ NO JSON FOUND:", text);
    return null;

  } catch (err) {
    console.log("❌ PARSE ERROR:", text);
    return null;
  }
};

/**
 * CROP RECOMMENDATIONS
 */
export const getCropRecommendations = async ({ soilType, location, season, language = 'en' }) => {
  const langNote = language === 'hi' ? 'Respond in Hindi language.' : 'Respond in English.';
  const model = getModel();

  const prompt = `You are an expert Indian agricultural advisor.
${langNote}

Soil: ${soilType}
Location: ${location}
Season: ${season}

Return ONLY JSON:
{
  "cropSuggestions": [],
  "bestSeason": "",
  "soilPreparation": "",
  "weatherRisk": "",
  "confidence": "",
  "tips": []
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🔥 GEMINI RAW:", text);

    return parseJSON(text) || {
      cropSuggestions: [],
      bestSeason: "N/A",
      soilPreparation: "Fallback",
      weatherRisk: "Unknown",
      confidence: 0,
      tips: ["Retry"]
    };

  } catch (err) {
    console.log("❌ GEMINI ERROR:", err.message);

    return {
      cropSuggestions: [],
      bestSeason: "N/A",
      soilPreparation: "Gemini failed",
      weatherRisk: "Unknown",
      confidence: 0,
      tips: ["Check API key"]
    };
  }
};

/**
 * FERTILIZER ADVICE
 */
export const getFertilizerAdvice = async ({ cropType, soilType, farmSize, language = 'en' }) => {
  const langNote = language === 'hi' ? 'Respond in Hindi language.' : 'Respond in English.';
  const model = getModel();

  const prompt = `Give fertilizer plan in JSON only for:
Crop: ${cropType}, Soil: ${soilType}, Size: ${farmSize}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🔥 FERTILIZER RAW:", text);

    return parseJSON(text) || {
      fertilizerPlan: [],
      totalCost: "N/A",
      soilAmendments: "Fallback",
      organicAlternatives: "N/A",
      precautions: ["Retry"],
      confidence: 0
    };

  } catch (err) {
    console.log("❌ FERTILIZER ERROR:", err.message);

    return {
      fertilizerPlan: [],
      totalCost: "N/A",
      soilAmendments: "Error",
      organicAlternatives: "N/A",
      precautions: ["Try again"],
      confidence: 0
    };
  }
};

/**
 * DISEASE DETECTION
 */
export const detectPlantDisease = async (imageBase64, mimeType = 'image/jpeg', language = 'en') => {
  const model = getModel(true);

  const prompt = `Analyze plant image and return JSON only`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
    ]);

    const text = result.response.text();

    console.log("🔥 DISEASE RAW:", text);

    return parseJSON(text) || {
      diseaseName: "Unknown",
      confidence: 0,
      severity: "unknown",
      affectedParts: [],
      symptoms: [],
      causes: "Fallback",
      treatment: { immediate: [], chemical: [], organic: [] },
      prevention: ["Retry"],
      spreadRisk: "unknown",
      estimatedYieldLoss: "unknown"
    };

  } catch (err) {
    console.log("❌ DISEASE ERROR:", err.message);

    return {
      diseaseName: "Error",
      confidence: 0,
      severity: "unknown",
      affectedParts: [],
      symptoms: [],
      causes: "API failed",
      treatment: { immediate: [], chemical: [], organic: [] },
      prevention: ["Try again"],
      spreadRisk: "unknown",
      estimatedYieldLoss: "unknown"
    };
  }
};
