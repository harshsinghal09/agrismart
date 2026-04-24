export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File too large. Max size is 5MB.' });
  }
  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({ success: false, message: err.message });
  }

  // JSON parse errors from Gemini
  if (err instanceof SyntaxError) {
    return res.status(502).json({ success: false, message: 'AI response parsing error. Please try again.' });
  }

  // Gemini API errors
  if (err.message?.includes('API_KEY') || err.message?.includes('API key')) {
    return res.status(503).json({ success: false, message: 'AI service configuration error.' });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
