import express from 'express';
import multer from 'multer';
import { analyzeCrop } from '../controllers/analyzeController.js';
import { adviseFertilizer } from '../controllers/fertilizerController.js';
import { detectDisease } from '../controllers/diseaseController.js';
import { chat } from '../controllers/chatController.js';

const router = express.Router();

// Multer config — memory storage for base64 handling
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

router.post('/analyze', analyzeCrop);
router.post('/fertilizer', adviseFertilizer);
router.post('/disease', upload.single('image'), detectDisease);
router.post('/chat', chat);

export default router;
