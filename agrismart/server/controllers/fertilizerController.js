import { getFertilizerAdvice } from '../services/geminiService.js';
import QueryHistory from '../models/QueryHistory.js';

export const adviseFertilizer = async (req, res, next) => {
  try {
    const { cropType, soilType, farmSize, language } = req.body;

    if (!cropType || !soilType || !farmSize) {
      return res.status(400).json({
        success: false,
        message: 'cropType, soilType, and farmSize are required fields.',
      });
    }

    const parsedSize = parseFloat(farmSize);
    if (isNaN(parsedSize) || parsedSize <= 0) {
      return res.status(400).json({
        success: false,
        message: 'farmSize must be a positive number.',
      });
    }

    const data = await getFertilizerAdvice({ cropType, soilType, farmSize: parsedSize, language });

    try {
      await QueryHistory.create({
        type: 'fertilizer',
        input: { cropType, soilType, farmSize: parsedSize },
        confidence: data.confidence,
      });
    } catch (_) {}

    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
