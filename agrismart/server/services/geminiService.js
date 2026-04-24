import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'demo-key');

const getModel = (vision = false) =>
  genAI.getGenerativeModel({ model: vision ? 'gemini-flash-latest' : 'gemini-flash-latest' });

/**
 * Safely parse JSON from Gemini response — strips markdown fences if present
 */
const parseJSON = (text) => {
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
};

/**
 * Generate crop recommendations
 */
export const getCropRecommendations = async ({ soilType, location, season, language = 'en' }) => {
  const langNote = language === 'hi' ? 'Respond in Hindi language.' : 'Respond in English.';
  const model = getModel();

  const prompt = `You are an expert Indian agricultural advisor with 20+ years of experience.
${langNote}

Given:
- Soil Type: ${soilType}
- Location/State: ${location}
- Season: ${season}

Provide detailed crop recommendations. Return ONLY valid JSON (no markdown, no extra text):
{
  "cropSuggestions": [
    {
      "name": "crop name",
      "variety": "recommended variety",
      "expectedYield": "yield per acre",
      "marketPrice": "approximate price per quintal",
      "growthDuration": "days to harvest",
      "waterRequirement": "low/medium/high",
      "suitability": "percentage match score 0-100"
    }
  ],
  "bestSeason": "ideal planting window",
  "soilPreparation": "brief soil prep advice",
  "weatherRisk": "key weather risks for this season/location",
  "confidence": "overall recommendation confidence percentage",
  "tips": ["tip1", "tip2", "tip3"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON(text);
};

/**
 * Generate fertilizer advice
 */
export const getFertilizerAdvice = async ({ cropType, soilType, farmSize, language = 'en' }) => {
  const langNote = language === 'hi' ? 'Respond in Hindi language.' : 'Respond in English.';
  const model = getModel();

  const prompt = `You are an expert soil scientist and agricultural advisor.
${langNote}

Given:
- Crop: ${cropType}
- Soil Type: ${soilType}
- Farm Size: ${farmSize} acres

Provide a complete fertilizer plan. Return ONLY valid JSON:
{
  "fertilizerPlan": [
    {
      "stage": "growth stage name",
      "timing": "when to apply",
      "fertilizers": [
        {
          "name": "fertilizer name",
          "type": "organic/chemical/bio",
          "quantityPerAcre": "amount",
          "method": "application method"
        }
      ]
    }
  ],
  "totalCost": "estimated cost for ${farmSize} acres in INR",
  "soilAmendments": "any soil amendments needed",
  "organicAlternatives": "organic options available",
  "precautions": ["precaution1", "precaution2"],
  "confidence": "recommendation confidence percentage"
}`;

  const result = await model.generateContent(prompt);
  return parseJSON(result.response.text());
};

/**
 * Detect plant disease from image
 */
export const detectPlantDisease = async (imageBase64, mimeType = 'image/jpeg', language = 'en') => {
  const langNote = language === 'hi' ? 'Respond in Hindi language.' : 'Respond in English.';
  const model = getModel(true);

  const prompt = `You are an expert plant pathologist.
${langNote}
Analyze this plant image and diagnose any disease or health issue.
Return ONLY valid JSON:
{
  "diseaseName": "name of disease or 'Healthy Plant' if no disease",
  "confidence": "detection confidence percentage",
  "severity": "mild/moderate/severe/none",
  "affectedParts": ["leaf", "stem", etc],
  "symptoms": ["symptom1", "symptom2"],
  "causes": "what causes this disease",
  "treatment": {
    "immediate": ["immediate action 1", "immediate action 2"],
    "chemical": ["chemical treatment options"],
    "organic": ["organic/natural treatment options"]
  },
  "prevention": ["prevention tip 1", "prevention tip 2"],
  "spreadRisk": "low/medium/high",
  "estimatedYieldLoss": "percentage if untreated"
}`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    },
  ]);
  return parseJSON(result.response.text());
};
