import { Router } from 'express';
import * as chatbotController from '@/controllers/chatbot';  // Adjust the path as necessary

const router = Router();

// Define the /api/chat route
router.post('/chat', chatbotController.chat);

export default router;
