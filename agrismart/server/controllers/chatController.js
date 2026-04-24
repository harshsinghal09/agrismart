import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'demo-key');

export const chat = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const safeHistory = Array.isArray(history)
      ? history.slice(-10).map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.parts?.[0]?.text || m.text || '') }],
        }))
      : [];

    const chatSession = model.startChat({
      history: safeHistory,
      generationConfig: { maxOutputTokens: 512 },
      systemInstruction:
        'You are AgriSmart AI, an expert agricultural assistant for Indian farmers. Answer questions about crops, soil, fertilizers, plant diseases, weather, and farming practices. Be concise, practical, and helpful. Use simple language. If asked about something unrelated to farming or agriculture, politely redirect to farming topics.',
    });

    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    return res.json({ success: true, reply });
  } catch (err) {
    next(err);
  }
};
