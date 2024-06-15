import createError from 'http-errors';
import ChatbotModel from '@/chatbot';  // Adjust the path as necessary

const chatbot = new ChatbotModel();

export const chat = async (req, res, next) => {
  try {
    const { messages } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return next(createError(400, "Invalid input format"));
    }

    // Generate chatbot response
    const response = await chatbot.generateResponse(messages);
    res.status(200).json({ response });
  } catch (error) {
    next(createError(500, error.message));
  }
};
