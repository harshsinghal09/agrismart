import { getCropRecommendations } from '../services/geminiService.js';
import QueryHistory from '../models/QueryHistory.js';

export const analyzeCrop = async (req, res, next) => {
  try {
    const { soilType, location, season, language } = req.body;

    if (!soilType || !location || !season) {
      return res.status(400).json({
        success: false,
        message: 'soilType, location, and season are required fields.',
      });
    }

    const data = await getCropRecommendations({ soilType, location, season, language });

    // Save to history if DB is connected
    try {
      await QueryHistory.create({
        type: 'crop',
        input: { soilType, location, season },
        confidence: data.confidence,
      });
    } catch (_) { /* DB not connected — skip silently */ }

    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
