import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { handleGoal, handleInsights, handleChat, handleDescribe } from '../controllers/aiController.js';

const router = express.Router();
router.post('/goal',     protect, handleGoal);
router.post('/insights', protect, handleInsights);
router.post('/chat',     protect, handleChat);
router.post('/describe', protect, handleDescribe);

export default router;