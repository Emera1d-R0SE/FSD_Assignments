/**
 * ask.js
 * Express router — POST /api/ask
 * Accepts an announcement + question, calls the Q&A AI service,
 * and returns a grounded plain-text answer.
 * Never exposes internal errors or the API key to the client.
 */

import { Router } from 'express';
import { askQuestion } from '../services/aiService.js';

const router = Router();

// User-facing error messages — mirrors the pattern in analyze.js
const USER_ERRORS = {
  AI_API_FAILURE:     'Something went wrong while answering your question. Please try again.',
  AI_EMPTY_RESPONSE:  'Something went wrong while answering your question. Please try again.',
  DEFAULT:            'Something went wrong while answering your question. Please try again.',
};

/**
 * POST /api/ask
 * Body: { announcement: string, question: string }
 * Returns: { success: true, answer: string } | { success: false, error: string }
 */
router.post('/', async (req, res) => {
  const { announcement, question } = req.body;

  // --- Validate announcement ---
  if (!announcement || typeof announcement !== 'string' || announcement.trim().length < 20) {
    return res.status(400).json({
      success: false,
      error: 'A valid announcement is required to answer questions.',
    });
  }

  // --- Validate question ---
  if (!question || typeof question !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Please provide a question.',
    });
  }

  const trimmedQuestion = question.trim();

  if (trimmedQuestion.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a more complete question.',
    });
  }

  if (trimmedQuestion.length > 500) {
    return res.status(400).json({
      success: false,
      error: 'Question is too long. Please keep it under 500 characters.',
    });
  }

  // --- Q&A processing ---
  try {
    const answer = await askQuestion(announcement.trim(), trimmedQuestion);

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error('[/api/ask] Error during Q&A:', err.message);
    const userMessage = USER_ERRORS[err.message] ?? USER_ERRORS.DEFAULT;
    return res.status(500).json({
      success: false,
      error: userMessage,
    });
  }
});

export default router;
