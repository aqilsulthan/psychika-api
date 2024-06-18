// src/routes/validations/chat.js
import { body } from 'express-validator';

export const validateChatRequest = [
  body('model').exists().withMessage('Model is required'),
  body('messages').isArray().withMessage('Messages should be an array'),
  body('messages.*.role').isIn(['system', 'user', 'assistant']).withMessage('Invalid role in messages'),
  body('messages.*.content').exists().withMessage('Content is required in messages'),
  body('stream').optional().isBoolean().withMessage('Stream should be a boolean'),
];
