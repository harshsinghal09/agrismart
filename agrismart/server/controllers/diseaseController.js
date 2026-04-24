import { detectPlantDisease } from '../services/geminiService.js';
import QueryHistory from '../models/QueryHistory.js';

export const detectDisease = async (req, res, next) => {
  try {
    const language = req.body.language || 'en';

    // Accept either file upload or base64 from body
    let imageBase64, mimeType;

    if (req.file) {
      imageBase64 = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype;
    } else if (req.body.imageBase64) {
      const matches = req.body.imageBase64.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        imageBase64 = matches[2];
      } else {
        imageBase64 = req.body.imageBase64;
        mimeType = req.body.mimeType || 'image/jpeg';
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'No image provided. Send as multipart/form-data or base64 in body.',
      });
    }

    const data = await detectPlantDisease(imageBase64, mimeType, language);

    try {
      await QueryHistory.create({
        type: 'disease',
        input: { mimeType },
        confidence: data.confidence,
      });
    } catch (_) {}

    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
