// src/controllers/chat.js
import axios from 'axios';
import db from '@/database';

// Function to remove the last incomplete sentence
const remlast = (str) => {
  let nstr = str.split(".");
  nstr.pop();
  return nstr.join(".") + ".";
  return nstr.replace(/\\\"/g, '"');
};

export const handleChat = async (req, res, next) => {
  try {
    const { model, messages, stream = false, options = {} } = req.body;
    const userId = req.user.id; // Extract user ID from authenticated user

    if (!model || !messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Model and messages are required fields, and messages must be a non-empty array.' });
    }

    const transformedMessages = messages.map(message => ({
      role: message.role,
      content: message.content || message.userMessage
    }));

    const response = await axios.post('https://ollama.sleepingowl.my.id/api/chat', {
      model,
      messages: transformedMessages,
      stream,
      ...options,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const assistantMessage = {
      role: 'assistant',
      content: remlast(response.data.message.content),
    };
    transformedMessages.push(assistantMessage);

    const newChat = await db.models.Chat.create({
      userId, // Save user ID with chat data
      model,
      messages: transformedMessages,
      stream,
    });

    return res.json({
      model,
      messages: transformedMessages,
    });
  } catch (err) {
    console.error('Error:', err);
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    } else if (err.request) {
      return res.status(500).json({ error: 'Network error' });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};

/**
 * GET /chat
 * Get all chat history for the authenticated user
 */
export const getChats = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated user
    const chats = await db.models.Chat.findAll({ where: { userId } });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /chat/:id
 * Get chat history by chat ID for the authenticated user
 */
export const getChatById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const chat = await db.models.Chat.findOne({ where: { id, userId } });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found or you do not have access to this chat.' });
    }

    return res.json(chat);
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /chat/:id
 * Delete chat history by chat ID for the authenticated user
 */
export const deleteChatById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const chat = await db.models.Chat.findOne({ where: { id, userId } });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found or you do not have access to this chat.' });
    }

    await chat.destroy();
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
