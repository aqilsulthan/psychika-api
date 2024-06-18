// src/routes/chat.js
import { Router } from 'express';
import * as chatController from '@/controllers/chat';
import { handleChat } from '@/controllers/chat';
import { validateChatRequest } from '@/routes/validations/chat';
import { isAuthenticated } from '@/middleware';

const router = Router();

router.route('/')
  .post(isAuthenticated, validateChatRequest, chatController.handleChat)
  .get(isAuthenticated, chatController.getAllChats);

router.route('/:id')
  .get(isAuthenticated, chatController.getChatById)
  .delete(isAuthenticated, chatController.deleteChatById);

export default router;
